import { expect, jest, test } from '@jest/globals'
import type { ICache } from '../src/parts/GetCache/GetCache.ts'
import * as ChangelogCache from '../src/parts/ChangelogCache/ChangelogCache.ts'

const uri = 'https://example.com/extensions/test.extension/CHANGELOG.md'
const cacheKey = `https://-/changelog/${encodeURIComponent(uri)}`
const now = 10_000_000

const createCache = (response: Response | undefined): ICache => {
  return {
    match: jest.fn<(request: RequestInfo | URL) => Promise<Response | undefined>>().mockResolvedValue(response),
    put: jest.fn<(request: RequestInfo | URL, response: Response) => Promise<void>>().mockResolvedValue(undefined),
  }
}

const createResponse = (value: string, cachedAt: number | string): Response => {
  return new Response(value, {
    headers: {
      'X-Lvce-Editor-Cached-At': `${cachedAt}`,
    },
  })
}

test('get returns undefined when the cache entry does not exist', async () => {
  const cache = createCache(undefined)

  const result = await ChangelogCache.get(uri, now, async () => cache)

  expect(result).toBeUndefined()
  expect(cache.match).toHaveBeenCalledWith(cacheKey)
})

test('get returns content cached less than one hour ago', async () => {
  const cache = createCache(createResponse('# Changelog', now - 30 * 60 * 1000))

  const result = await ChangelogCache.get(uri, now, async () => cache)

  expect(result).toBe('# Changelog')
})

test('get returns content cached exactly one hour ago', async () => {
  const cache = createCache(createResponse('# Changelog', now - 60 * 60 * 1000))

  const result = await ChangelogCache.get(uri, now, async () => cache)

  expect(result).toBe('# Changelog')
})

test('get returns undefined when the cache entry is more than one hour old', async () => {
  const cache = createCache(createResponse('# Stale changelog', now - 60 * 60 * 1000 - 1))

  const result = await ChangelogCache.get(uri, now, async () => cache)

  expect(result).toBeUndefined()
})

test('get returns undefined when the cache timestamp is invalid', async () => {
  const cache = createCache(createResponse('# Changelog', 'invalid'))

  const result = await ChangelogCache.get(uri, now, async () => cache)

  expect(result).toBeUndefined()
})

test('get returns undefined when cache storage fails', async () => {
  const result = await ChangelogCache.get(uri, now, async () => {
    throw new Error('cache unavailable')
  })

  expect(result).toBeUndefined()
})

test('set stores the content and cache timestamp', async () => {
  const cache = createCache(undefined)

  await ChangelogCache.set(uri, '# Changelog', now, async () => cache)

  expect(cache.put).toHaveBeenCalledTimes(1)
  const [key, response] = (cache.put as jest.MockedFunction<ICache['put']>).mock.calls[0]
  expect(key).toBe(cacheKey)
  expect(response.headers.get('X-Lvce-Editor-Cached-At')).toBe(`${now}`)
  expect(response.headers.get('Content-Type')).toBe('application/markdown')
  expect(await response.text()).toBe('# Changelog')
})

test('set ignores cache storage failures', async () => {
  await expect(
    ChangelogCache.set(uri, '# Changelog', now, async () => {
      throw new Error('cache unavailable')
    }),
  ).resolves.toBeUndefined()
})
