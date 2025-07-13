import { expect, test } from '@jest/globals'
import { featureThemeEnabled } from '../src/parts/FeatureThemeEnabled/FeatureThemeEnabled.ts'

test('featureThemeEnabled returns true when extension has colorThemes', () => {
  const extension = { colorThemes: [{ label: 'Test Theme', uiTheme: 'vs-dark' }] }
  expect(featureThemeEnabled(extension)).toBe(true)
})

test('featureThemeEnabled returns true when extension has iconThemes', () => {
  const extension = { iconThemes: [{ label: 'Test Icon Theme', id: 'test-icon-theme' }] }
  expect(featureThemeEnabled(extension)).toBe(true)
})

test('featureThemeEnabled returns true when extension has productIconThemes', () => {
  const extension = { productIconThemes: [{ label: 'Test Product Icon Theme', id: 'test-product-icon-theme' }] }
  expect(featureThemeEnabled(extension)).toBe(true)
})

test('featureThemeEnabled returns true when extension has multiple theme types', () => {
  const extension = {
    colorThemes: [{ label: 'Test Color Theme' }],
    iconThemes: [{ label: 'Test Icon Theme' }],
  }
  expect(featureThemeEnabled(extension)).toBe(true)
})

test('featureThemeEnabled returns false when extension has no theme properties', () => {
  const extension = { name: 'test-extension' }
  expect(featureThemeEnabled(extension)).toBe(false)
})

test('featureThemeEnabled returns false when extension is null', () => {
  expect(featureThemeEnabled(null)).toBe(false)
})

test('featureThemeEnabled returns false when extension is undefined', () => {
  expect(featureThemeEnabled(undefined)).toBe(false)
})

test('featureThemeEnabled returns false when all theme properties are empty arrays', () => {
  const extension = { colorThemes: [], iconThemes: [], productIconThemes: [] }
  expect(featureThemeEnabled(extension)).toBe(false)
})
