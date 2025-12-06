import { expect, test } from '@jest/globals'
import * as FeatureThemeEnabled from '../src/parts/FeatureThemeEnabled/FeatureThemeEnabled.ts'

test('featureThemeEnabled returns true when extension has colorThemes', () => {
  const extension: unknown = { colorThemes: [{ label: 'Test Theme', uiTheme: 'vs-dark' }] }
  expect(FeatureThemeEnabled.featureThemeEnabled(extension)).toBe(true)
})

test('featureThemeEnabled returns true when extension has iconThemes', () => {
  const extension: unknown = { iconThemes: [{ id: 'test-icon-theme', label: 'Test Icon Theme' }] }
  expect(FeatureThemeEnabled.featureThemeEnabled(extension)).toBe(true)
})

test('featureThemeEnabled returns true when extension has productIconThemes', () => {
  const extension: unknown = { productIconThemes: [{ id: 'test-product-icon-theme', label: 'Test Product Icon Theme' }] }
  expect(FeatureThemeEnabled.featureThemeEnabled(extension)).toBe(true)
})

test('featureThemeEnabled returns true when extension has multiple theme types', () => {
  const extension: unknown = {
    colorThemes: [{ label: 'Test Color Theme' }],
    iconThemes: [{ label: 'Test Icon Theme' }],
  }
  expect(FeatureThemeEnabled.featureThemeEnabled(extension)).toBe(true)
})

test('featureThemeEnabled returns false when extension has no theme properties', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(FeatureThemeEnabled.featureThemeEnabled(extension)).toBe(false)
})

test('featureThemeEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(FeatureThemeEnabled.featureThemeEnabled(extension)).toBe(false)
})

test('featureThemeEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(FeatureThemeEnabled.featureThemeEnabled(extension)).toBe(false)
})

test('featureThemeEnabled returns true when all theme properties are empty arrays', () => {
  const extension: unknown = { colorThemes: [], iconThemes: [], productIconThemes: [] }
  expect(FeatureThemeEnabled.featureThemeEnabled(extension)).toBe(true)
})
