import { expect, test } from '@jest/globals'
import type { MarkdownOptions } from '../src/parts/MarkdownOptions/MarkdownOptions.ts'
import { getMarkdownCacheKey } from '../src/parts/GetMarkdownCacheKey/GetMarkdownCacheKey.ts'

test('getMarkdownCacheKey - empty string - electron', async () => {
  const markdown = ''
  const options: MarkdownOptions = {
    locationProtocol: 'app:',
  }
  expect(await getMarkdownCacheKey(markdown, options)).toBe('https://-/markdown/f57fb45324850588b6ac4581bc98707a5fcebf2691ddb15945576d6a6389ea71')
})

test('getMarkdownCacheKey - empty string - web', async () => {
  const markdown = ''
  const options: MarkdownOptions = {
    locationProtocol: 'http:',
  }
  expect(await getMarkdownCacheKey(markdown, options)).toBe('/markdown/9bb0961250acbf880ed5ae890741a8708aa3ad34774bec95b1495e61e79c9394')
})
