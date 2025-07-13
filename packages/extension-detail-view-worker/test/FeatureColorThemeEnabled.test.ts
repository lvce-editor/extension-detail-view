import { expect, test } from '@jest/globals'
import { featureColorThemeEnabled } from '../src/parts/FeatureColorThemeEnabled/FeatureColorThemeEnabled.ts'

test('featureColorThemeEnabled returns true when extension has colorThemes', () => {
  const extension: unknown = { colorThemes: [{ label: 'Test Theme', uiTheme: 'vs-dark' }] }
  expect(featureColorThemeEnabled(extension)).toBe(true)
})

test('featureColorThemeEnabled returns true when extension has empty colorThemes array', () => {
  const extension: unknown = { colorThemes: [] }
  expect(featureColorThemeEnabled(extension)).toBe(true)
})

test('featureColorThemeEnabled returns false when extension has no colorThemes', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(featureColorThemeEnabled(extension)).toBe(false)
})

test('featureColorThemeEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(featureColorThemeEnabled(extension)).toBe(false)
})

test('featureColorThemeEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(featureColorThemeEnabled(extension)).toBe(false)
})
