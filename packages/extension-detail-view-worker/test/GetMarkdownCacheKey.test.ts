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
