import { expect, test } from '@jest/globals'
import { getOpenUri } from '../src/parts/GetOpenUri/GetOpenUri.ts'

test('returns a file path for a remote url', () => {
  expect(getOpenUri('http://localhost:3000/remote/extensions/test-theme/color-theme.json')).toBe('/extensions/test-theme/color-theme.json')
})

test('returns a file path for a file uri', () => {
  expect(getOpenUri('file:///extensions/test%20theme/color-theme.json')).toBe('/extensions/test theme/color-theme.json')
})

test('returns another uri unchanged', () => {
  expect(getOpenUri('https://example.com/extensions/test-theme/color-theme.json')).toBe('https://example.com/extensions/test-theme/color-theme.json')
})

test('returns an absolute path unchanged', () => {
  expect(getOpenUri('/extensions/test-theme/color-theme.json')).toBe('/extensions/test-theme/color-theme.json')
})
