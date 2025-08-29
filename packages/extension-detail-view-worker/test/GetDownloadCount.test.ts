import { test, expect } from '@jest/globals'
import { getDownloadCount } from '../src/parts/GetDownloadCount/GetDownloadCount.ts'

test('getDownloadCount returns n/a for null extension', () => {
  const result = getDownloadCount(null)
  expect(result).toBe('n/a')
})

test('getDownloadCount returns n/a for undefined extension', () => {
  const result = getDownloadCount(undefined)
  expect(result).toBe('n/a')
})

test('getDownloadCount returns n/a for extension without download data', () => {
  const extension = { name: 'test-extension' }
  const result = getDownloadCount(extension)
  expect(result).toBe('n/a')
})

test('getDownloadCount returns formatted download count from downloadCount property', () => {
  const extension = { downloadCount: 1_234_567 }
  const result = getDownloadCount(extension)
  expect(result).toBe('1,234,567')
})

test('getDownloadCount returns formatted download count from downloads property', () => {
  const extension = { downloads: 50_000 }
  const result = getDownloadCount(extension)
  expect(result).toBe('50,000')
})

test('getDownloadCount returns formatted download count from marketplace.downloadCount', () => {
  const extension = { marketplace: { downloadCount: 999_999 } }
  const result = getDownloadCount(extension)
  expect(result).toBe('999,999')
})

test('getDownloadCount returns formatted download count from marketplace.downloads', () => {
  const extension = { marketplace: { downloads: 75_000 } }
  const result = getDownloadCount(extension)
  expect(result).toBe('75,000')
})

test('getDownloadCount returns formatted download count from packageJSON.downloadCount', () => {
  const extension = { packageJSON: { downloadCount: 250_000 } }
  const result = getDownloadCount(extension)
  expect(result).toBe('250,000')
})

test('getDownloadCount returns formatted download count from packageJSON.downloads', () => {
  const extension = { packageJSON: { downloads: 1_000_000 } }
  const result = getDownloadCount(extension)
  expect(result).toBe('1,000,000')
})
