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

test('fileMatch', () => {
  expect(ExtensionDetailStrings.fileMatch()).toBe('File Match')
})

test('schema', () => {
  expect(ExtensionDetailStrings.schema()).toBe('Schema')
})

test('theme', () => {
  expect(ExtensionDetailStrings.theme()).toBe('Theme')
})

test('commands', () => {
  expect(ExtensionDetailStrings.commands()).toBe('Commands')
})

test('webViews', () => {
  expect(ExtensionDetailStrings.webViews()).toBe('Web Views')
})

test('jsonValidation', () => {
  expect(ExtensionDetailStrings.jsonValidation()).toBe('Json Validation')
})

test('programmingLanguages', () => {
  expect(ExtensionDetailStrings.programmingLanguages()).toBe('Programming Languages')
})

test('settings', () => {
  expect(ExtensionDetailStrings.settings()).toBe('Settings')
})

test('id', () => {
  expect(ExtensionDetailStrings.id()).toBe('Id')
})

test('selector', () => {
  expect(ExtensionDetailStrings.selector()).toBe('Selector')
})

test('contentSecurityPolicy', () => {
  expect(ExtensionDetailStrings.contentSecurityPolicy()).toBe('ContentSecurityPolicy')
})

test('elements', () => {
  expect(ExtensionDetailStrings.elements()).toBe('Elements')
})
