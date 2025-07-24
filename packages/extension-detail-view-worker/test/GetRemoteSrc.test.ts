import { test, expect } from '@jest/globals'
import { getRemoteSrc } from '../src/parts/GetRemoteSrc/GetRemoteSrc.ts'

test('getRemoteSrc adds /remote prefix to uri', () => {
  const uri = '/path/to/extension'
  const result = getRemoteSrc(uri)
  expect(result).toBe('/remote/path/to/extension')
})

test('getRemoteSrc handles empty uri', () => {
  const uri = ''
  const result = getRemoteSrc(uri)
  expect(result).toBe('/remote')
})

test('getRemoteSrc handles uri with trailing slash', () => {
  const uri = '/path/to/extension/'
  const result = getRemoteSrc(uri)
  expect(result).toBe('/remote/path/to/extension/')
})
