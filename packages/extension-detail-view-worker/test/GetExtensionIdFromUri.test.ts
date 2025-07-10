import { expect, test } from '@jest/globals'
import * as GetExtensionIdFromUri from '../src/parts/GetExtensionIdFromUri/GetExtensionIdFromUri.ts'

test('getExtensionIdFromUri - normal uri', () => {
  const uri = 'extension-detail://my-extension-id'
  const result = GetExtensionIdFromUri.getExtensionIdFromUri(uri)
  expect(result).toBe('my-extension-id')
})

test('getExtensionIdFromUri - empty id', () => {
  const uri = 'extension-detail://'
  const result = GetExtensionIdFromUri.getExtensionIdFromUri(uri)
  expect(result).toBe('')
})

test('getExtensionIdFromUri - uri with extra slashes', () => {
  const uri = 'extension-detail:///extra-slash'
  const result = GetExtensionIdFromUri.getExtensionIdFromUri(uri)
  expect(result).toBe('/extra-slash')
})

test('getExtensionIdFromUri - uri with path', () => {
  const uri = 'extension-detail://my-extension-id/path'
  const result = GetExtensionIdFromUri.getExtensionIdFromUri(uri)
  expect(result).toBe('my-extension-id/path')
})

test('getExtensionIdFromUri - malformed uri', () => {
  const uri = 'not-an-extension-uri'
  const result = GetExtensionIdFromUri.getExtensionIdFromUri(uri)
  expect(result).toBe('i')
})