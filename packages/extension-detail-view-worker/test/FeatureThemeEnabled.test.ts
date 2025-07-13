import { expect, test } from '@jest/globals'
import { featureThemeEnabled } from '../src/parts/FeatureThemeEnabled/FeatureThemeEnabled.ts'

test('featureThemeEnabled returns true when extension has colorThemes', () => {
  const extension: unknown = { colorThemes: [{ label: 'Test Theme', uiTheme: 'vs-dark' }] }
  expect(featureThemeEnabled(extension)).toBe(true)
})

test('featureThemeEnabled returns true when extension has iconThemes', () => {
  const extension: unknown = { iconThemes: [{ label: 'Test Icon Theme', id: 'test-icon-theme' }] }
  expect(featureThemeEnabled(extension)).toBe(true)
})

test('featureThemeEnabled returns true when extension has productIconThemes', () => {
  const extension: unknown = { productIconThemes: [{ label: 'Test Product Icon Theme', id: 'test-product-icon-theme' }] }
  expect(featureThemeEnabled(extension)).toBe(true)
})

test('featureThemeEnabled returns true when extension has multiple theme types', () => {
  const extension: unknown = {
    colorThemes: [{ label: 'Test Color Theme' }],
    iconThemes: [{ label: 'Test Icon Theme' }],
  }
  expect(featureThemeEnabled(extension)).toBe(true)
})

test('featureThemeEnabled returns false when extension has no theme properties', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(featureThemeEnabled(extension)).toBe(false)
})

test('featureThemeEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(featureThemeEnabled(extension)).toBe(false)
})

test('featureThemeEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(featureThemeEnabled(extension)).toBe(false)
})

test('featureThemeEnabled returns false when all theme properties are empty arrays', () => {
  const extension: unknown = { colorThemes: [], iconThemes: [], productIconThemes: [] }
  expect(featureThemeEnabled(extension)).toBe(false)
})
