import { expect, test } from '@jest/globals'
import { getImageCopyUrl } from '../src/parts/GetImageCopyUrl/GetImageCopyUrl.ts'

// Mock location for getImageCopyUrl
Object.defineProperty(globalThis, 'location', {
  value: {
    host: 'example.com',
    protocol: 'https:',
  },
  writable: true,
})

test('getImageCopyUrl returns absolute URL with protocol and host', () => {
  const iconSrc = '/test/icon.png'
  const result = getImageCopyUrl(iconSrc)
  expect(result).toBe('https://example.com/test/icon.png')
})

test('getImageCopyUrl handles different icon paths', () => {
  const iconSrc = '/assets/icons/extension.svg'
  const result = getImageCopyUrl(iconSrc)
  expect(result).toBe('https://example.com/assets/icons/extension.svg')
})
