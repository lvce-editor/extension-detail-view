import { expect, test } from '@jest/globals'
import * as FeatureIconThemeEnabled from '../src/parts/FeatureIconThemeEnabled/FeatureIconThemeEnabled.ts'

test('featureIconThemeEnabled returns true when extension has iconThemes', () => {
  const extension: unknown = { iconThemes: [{ id: 'test-icon-theme', label: 'Test Icon Theme' }] }
  expect(FeatureIconThemeEnabled.featureIconThemeEnabled(extension)).toBe(true)
})

test('featureIconThemeEnabled returns true when extension has empty iconThemes array', () => {
  const extension: unknown = { iconThemes: [] }
  expect(FeatureIconThemeEnabled.featureIconThemeEnabled(extension)).toBe(true)
})

test('featureIconThemeEnabled returns false when extension has no iconThemes', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(FeatureIconThemeEnabled.featureIconThemeEnabled(extension)).toBe(false)
})

test('featureIconThemeEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(FeatureIconThemeEnabled.featureIconThemeEnabled(extension)).toBe(false)
})

test('featureIconThemeEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(FeatureIconThemeEnabled.featureIconThemeEnabled(extension)).toBe(false)
})
