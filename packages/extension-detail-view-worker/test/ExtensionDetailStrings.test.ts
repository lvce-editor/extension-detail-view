import { expect, test } from '@jest/globals'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as I18nString from '../src/parts/I18nString/I18nString.ts'
import * as UiStrings from '../src/parts/UiStrings/UiStrings.ts'

test('installation', () => {
  const result = ExtensionDetailStrings.installation()
  expect(result).toBe(I18nString.i18nString(UiStrings.Installation))
})

test('marketplace', () => {
  const result = ExtensionDetailStrings.marketplace()
  expect(result).toBe(I18nString.i18nString(UiStrings.Marketplace))
})

test('categories', () => {
  const result = ExtensionDetailStrings.categories()
  expect(result).toBe(I18nString.i18nString(UiStrings.Categories))
})

test('resources', () => {
  const result = ExtensionDetailStrings.resources()
  expect(result).toBe(I18nString.i18nString(UiStrings.Resources))
})

test('copy', () => {
  const result = ExtensionDetailStrings.copy()
  expect(result).toBe(I18nString.i18nString(UiStrings.Copy))
})

test('changelog', () => {
  const result = ExtensionDetailStrings.changelog()
  expect(result).toBe(I18nString.i18nString(UiStrings.Changelog))
})

test('details', () => {
  const result = ExtensionDetailStrings.details()
  expect(result).toBe(I18nString.i18nString(UiStrings.Details))
})

test('disable', () => {
  const result = ExtensionDetailStrings.disable()
  expect(result).toBe(I18nString.i18nString(UiStrings.Disable))
})

test('features', () => {
  const result = ExtensionDetailStrings.features()
  expect(result).toBe(I18nString.i18nString(UiStrings.Features))
})

test('none', () => {
  const result = ExtensionDetailStrings.none()
  expect(result).toBe(I18nString.i18nString(UiStrings.None))
})

test('openInNewTab', () => {
  const result = ExtensionDetailStrings.openInNewTab()
  expect(result).toBe(I18nString.i18nString(UiStrings.OpenInNewTab))
})

test('label', () => {
  const result = ExtensionDetailStrings.label()
  expect(result).toBe(I18nString.i18nString(UiStrings.Label))
})

test('openImageInNewTab', () => {
  const result = ExtensionDetailStrings.openImageInNewTab()
  expect(result).toBe(I18nString.i18nString(UiStrings.OpenImageInNewTab))
})

test('saveImageAs', () => {
  const result = ExtensionDetailStrings.saveImageAs()
  expect(result).toBe(I18nString.i18nString(UiStrings.SaveImageAs))
})

test('fileMatch', () => {
  const result = ExtensionDetailStrings.fileMatch()
  expect(result).toBe(I18nString.i18nString(UiStrings.FileMatch))
})

test('schema', () => {
  const result = ExtensionDetailStrings.schema()
  expect(result).toBe(I18nString.i18nString(UiStrings.Schema))
})

test('setColorTheme', () => {
  const result = ExtensionDetailStrings.setColorTheme()
  expect(result).toBe(I18nString.i18nString(UiStrings.SetColorTheme))
})

test('theme', () => {
  const result = ExtensionDetailStrings.theme()
  expect(result).toBe(I18nString.i18nString(UiStrings.Theme))
})

test('commands', () => {
  const result = ExtensionDetailStrings.commands()
  expect(result).toBe(I18nString.i18nString(UiStrings.Commands))
})

test('webViews', () => {
  const result = ExtensionDetailStrings.webViews()
  expect(result).toBe(I18nString.i18nString(UiStrings.WebViews))
})

test('jsonValidation', () => {
  const result = ExtensionDetailStrings.jsonValidation()
  expect(result).toBe(I18nString.i18nString(UiStrings.JsonValidation))
})

test('programmingLanguages', () => {
  const result = ExtensionDetailStrings.programmingLanguages()
  expect(result).toBe(I18nString.i18nString(UiStrings.ProgrammingLanguages))
})

test('settings', () => {
  const result = ExtensionDetailStrings.settings()
  expect(result).toBe(I18nString.i18nString(UiStrings.Settings))
})

test('id', () => {
  const result = ExtensionDetailStrings.id()
  expect(result).toBe(I18nString.i18nString(UiStrings.Id))
})

test('selector', () => {
  const result = ExtensionDetailStrings.selector()
  expect(result).toBe(I18nString.i18nString(UiStrings.Selector))
})

test('contentSecurityPolicy', () => {
  const result = ExtensionDetailStrings.contentSecurityPolicy()
  expect(result).toBe(I18nString.i18nString(UiStrings.ContentSecurityPolicy))
})

test('elements', () => {
  const result = ExtensionDetailStrings.elements()
  expect(result).toBe(I18nString.i18nString(UiStrings.Elements))
})

test('notImplemented', () => {
  const result = ExtensionDetailStrings.notImplemented()
  expect(result).toBe(I18nString.i18nString(UiStrings.NotImplemented))
})

test('uninstall', () => {
  const result = ExtensionDetailStrings.uninstall()
  expect(result).toBe(I18nString.i18nString(UiStrings.Uninstall))
})

test('scrollToTop', () => {
  const result = ExtensionDetailStrings.scrollToTop()
  expect(result).toBe(I18nString.i18nString(UiStrings.ScrollToTop))
})
