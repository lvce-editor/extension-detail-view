import { expect, test } from '@jest/globals'
import { featureColorThemeEnabled } from '../src/parts/FeatureColorThemeEnabled/FeatureColorThemeEnabled.ts'

test('featureColorThemeEnabled returns true when extension has colorThemes', () => {
  const extension = { colorThemes: [{ label: 'Test Theme', uiTheme: 'vs-dark' }] }
  expect(featureColorThemeEnabled(extension)).toBe(true)
})

test('featureColorThemeEnabled returns true when extension has empty colorThemes array', () => {
  const extension = { colorThemes: [] }
  expect(featureColorThemeEnabled(extension)).toBe(true)
})

test('featureColorThemeEnabled returns false when extension has no colorThemes', () => {
  const extension = { name: 'test-extension' }
  expect(featureColorThemeEnabled(extension)).toBe(false)
})

test('featureColorThemeEnabled returns false when extension is null', () => {
  expect(featureColorThemeEnabled(null)).toBe(false)
})

test('featureColorThemeEnabled returns false when extension is undefined', () => {
  expect(featureColorThemeEnabled(undefined)).toBe(false)
})
