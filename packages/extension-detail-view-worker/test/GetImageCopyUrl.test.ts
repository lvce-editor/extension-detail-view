import { expect, test } from '@jest/globals'
import { getImageCopyUrl } from '../src/parts/GetImageCopyUrl/GetImageCopyUrl.ts'

test('getImageCopyUrl returns absolute URL with protocol and host', () => {
  const iconSrc = '/test/icon.png'
  const result = getImageCopyUrl(iconSrc, 'https:', 'example.com')
  expect(result).toBe('https://example.com/test/icon.png')
})

test('getImageCopyUrl handles different icon paths', () => {
  const iconSrc = '/assets/icons/extension.svg'
  const result = getImageCopyUrl(iconSrc, 'https:', 'example.com')
  expect(result).toBe('https://example.com/assets/icons/extension.svg')
})

test('getImageCopyUrl returns empty string when iconSrc is empty', () => {
  const iconSrc = ''
  const result = getImageCopyUrl(iconSrc, 'https:', 'example.com')
  expect(result).toBe('')
})
