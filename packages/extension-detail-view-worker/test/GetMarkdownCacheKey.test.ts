import { expect, test } from '@jest/globals'
import type { MarkdownOptions } from '../src/parts/MarkdownOptions/MarkdownOptions.ts'
import { getMarkdownCacheKey } from '../src/parts/GetMarkdownCacheKey/GetMarkdownCacheKey.ts'

test('getMarkdownCacheKey - empty string - electron', async () => {
  const markdown = ''
  const options: MarkdownOptions = {
    locationProtocol: 'app:',
  }
  expect(await getMarkdownCacheKey(markdown, options)).toBe('https://-/markdown/f808f62bb5c14f5ae18bffb9e8fe2cc1bc09680d48a5d1d67f9bc79b60b4fb23')
})

test('getMarkdownCacheKey - empty string - web', async () => {
  const markdown = ''
  const options: MarkdownOptions = {
    locationProtocol: 'http:',
  }
  expect(await getMarkdownCacheKey(markdown, options)).toBe('/markdown/c7d440e51113d46651e42d995560119b55de3f101b8db91d367ff0d9d749758d')
})

test.each(['http:', 'https:', 'app:'])('includes the extension id for %s', async (locationProtocol) => {
  const options = { extensionId: 'publisher.extension', locationProtocol }
  const key = await getMarkdownCacheKey('# Readme', options)
  const prefix = locationProtocol === 'app:' ? 'https://-' : ''
  expect(key).toMatch(new RegExp(`^${prefix}/markdown/publisher\\.extension/[a-f0-9]{64}$`))
  expect(await getMarkdownCacheKey('# Readme', options)).toBe(key)
  expect(await getMarkdownCacheKey('# Changed readme', options)).not.toBe(key)
  expect(await getMarkdownCacheKey('# Readme', { ...options, baseUrl: '/other' })).not.toBe(key)
  expect(await getMarkdownCacheKey('# Readme', { ...options, extensionId: 'publisher.other' })).not.toBe(key)
})

test('encodes extension ids as a single cache path segment', async () => {
  const key = await getMarkdownCacheKey('', { extensionId: 'publisher/name?#', locationProtocol: 'app:' })
  expect(key).toMatch(/^https:\/\/-\/markdown\/publisher%2Fname%3F%23\/[a-f0-9]{64}$/)
})
