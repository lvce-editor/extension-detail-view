import { expect, test } from '@jest/globals'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'

test('copy', () => {
  expect(ExtensionDetailStrings.copy()).toBe('Copy')
})

test('openInNewTab', () => {
  expect(ExtensionDetailStrings.openInNewTab()).toBe('Open in New Tab')
})

test('openImageInNewTab', () => {
  expect(ExtensionDetailStrings.openImageInNewTab()).toBe('Open Image in New Tab')
})

test('saveImageAs', () => {
  expect(ExtensionDetailStrings.saveImageAs()).toBe('Save Image as')
})
