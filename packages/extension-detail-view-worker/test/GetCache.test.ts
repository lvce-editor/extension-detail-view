import { expect, jest, test } from '@jest/globals'
import * as CacheWorker from '../src/parts/CacheWorker/CacheWorker.ts'

test('cache operations use cache-worker with serializable text and headers', async () => {
  const originalNavigator = globalThis.navigator
  // @ts-expect-error Storage Buckets is not in WorkerNavigator yet.
  globalThis.navigator = { storageBuckets: {} } as typeof globalThis.navigator
  const getCacheStorageItem = jest
    .fn<
      (
        url: string,
        cacheName: string,
        bucketName: string,
        bucketOptions: { expires: number; quota: number },
      ) => Promise<{
        body: string
        headers: Record<string, string>
        status: number
        statusText: string
      } | null>
    >()
    .mockImplementation(async (url) => {
      if (url.endsWith('/offline')) {
        throw new Error('cache worker unavailable')
      }
      if (url.endsWith('/missing')) {
        return null
      }
      return {
        body: '# Cached markdown',
        headers: { 'content-type': 'application/markdown' },
        status: 200,
        statusText: '',
      }
    })
  const setCacheStorageItem = jest
    .fn<
      (
        request: string,
        value: string,
        cacheName: string,
        headers: Record<string, string>,
        bucketName: string,
        bucketOptions: { expires: number; quota: number },
      ) => Promise<{ success: boolean; errorCode: string; errorMessage: string }>
    >()
    .mockImplementation(async (request) => {
      if (request.endsWith('/offline')) {
        throw new Error('cache worker unavailable')
      }
      return {
        errorCode: 'CACHE_STORAGE_WRITE_FAILED',
        errorMessage: 'quota exceeded',
        success: false,
      }
    })
  const invocations: Array<[string, ...any[]]> = []
  CacheWorker.set({
    invoke: async (command: string, ...args: any[]) => {
      invocations.push([command, ...args])
      if (command === 'Cache.getCacheStorageItem') {
        return getCacheStorageItem(...(args as Parameters<typeof getCacheStorageItem>))
      }
      if (command === 'Cache.setCacheStorageItem') {
        return setCacheStorageItem(...(args as Parameters<typeof setCacheStorageItem>))
      }
      throw new Error(`Unexpected cache worker command: ${command}`)
    },
  } as any)
  try {
    const { getCache } = await import('../src/parts/GetCache/GetCache.ts')
    const firstBucket = await getCache('readme-cache', 'markdown-cache')
    const otherBucket = await getCache('readme-cache', 'changelog-cache')
    expect(firstBucket).not.toBe(otherBucket)
    expect(await getCache('readme-cache', 'markdown-cache')).toBe(firstBucket)
    await firstBucket.put('/readme', new Response('# New markdown', { headers: { 'content-type': 'application/markdown' } }))
    const cached = await firstBucket.match('/readme')
    expect(await cached?.text()).toBe('# Cached markdown')
    expect(cached?.headers.get('content-type')).toBe('application/markdown')
    expect(setCacheStorageItem).toHaveBeenCalledWith(
      '/readme',
      '# New markdown',
      'readme-cache',
      { 'content-type': 'application/markdown' },
      'markdown-cache',
      expect.objectContaining({ expires: expect.any(Number), quota: 100 * 1024 * 1024 }),
    )
    expect(await firstBucket.match('/missing')).toBeUndefined()
    expect(await firstBucket.match('/offline')).toBeUndefined()
    await firstBucket.put('/offline', new Response('ignored'))
    const requestCache = await firstBucket.match(new Request('https://example.com/readme'))
    expect(await requestCache?.text()).toBe('# Cached markdown')
    expect(getCacheStorageItem).toHaveBeenLastCalledWith('https://example.com/readme', 'readme-cache', 'markdown-cache', expect.any(Object))
    globalThis.navigator = {} as typeof globalThis.navigator
    const unsupportedBucket = await getCache('unsupported-cache', 'unsupported-bucket')
    expect(await unsupportedBucket.match('/readme')).toBeUndefined()
    await unsupportedBucket.put('/readme', new Response('ignored'))
    expect(setCacheStorageItem).toHaveBeenCalledTimes(2)
    expect(invocations.map(([method]) => method)).toEqual([
      'Cache.setCacheStorageItem',
      'Cache.getCacheStorageItem',
      'Cache.getCacheStorageItem',
      'Cache.getCacheStorageItem',
      'Cache.setCacheStorageItem',
      'Cache.getCacheStorageItem',
    ])
    expect(getCacheStorageItem).toHaveBeenCalledWith(
      '/readme',
      'readme-cache',
      'markdown-cache',
      expect.objectContaining({ expires: expect.any(Number), quota: 100 * 1024 * 1024 }),
    )
  } finally {
    globalThis.navigator = originalNavigator
  }
})
