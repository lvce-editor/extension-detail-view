import { expect, test } from '@jest/globals'
import { featureIconThemeEnabled } from '../src/parts/FeatureIconThemeEnabled/FeatureIconThemeEnabled.ts'

test('featureIconThemeEnabled returns true when extension has iconThemes', () => {
  const extension: unknown = { iconThemes: [{ label: 'Test Icon Theme', id: 'test-icon-theme' }] }
  expect(featureIconThemeEnabled(extension)).toBe(true)
})

test('featureIconThemeEnabled returns true when extension has empty iconThemes array', () => {
  const extension: unknown = { iconThemes: [] }
  expect(featureIconThemeEnabled(extension)).toBe(true)
})

test('featureIconThemeEnabled returns false when extension has no iconThemes', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(featureIconThemeEnabled(extension)).toBe(false)
})

test('featureIconThemeEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(featureIconThemeEnabled(extension)).toBe(false)
})

test('featureIconThemeEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(featureIconThemeEnabled(extension)).toBe(false)
})
