import { expect, test } from '@jest/globals'
import * as GetBaseUrl from '../src/parts/GetBaseUrl/GetBaseUrl.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('remote platform', () => {
  expect(GetBaseUrl.getBaseUrl('/test/path', PlatformType.Remote)).toBe('/remote/test/path/')
})

test('electron platform', () => {
  expect(GetBaseUrl.getBaseUrl('/test/path', PlatformType.Electron)).toBe('/remote/test/path/')
})

test('web platform', () => {
  expect(GetBaseUrl.getBaseUrl('/test/path', PlatformType.Web)).toBe('/test/path')
})

test('handles empty path', () => {
  expect(GetBaseUrl.getBaseUrl('', PlatformType.Remote)).toBe('/remote/')
  expect(GetBaseUrl.getBaseUrl('', PlatformType.Web)).toBe('')
})
