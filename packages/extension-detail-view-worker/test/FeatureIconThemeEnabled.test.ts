import { expect, test } from '@jest/globals'
import { featureIconThemeEnabled } from '../src/parts/FeatureThemeEnabled/FeatureThemeEnabled.ts'

test('featureIconThemeEnabled returns true when extension has iconThemes', () => {
  const extension = { iconThemes: [{ label: 'Test Icon Theme', id: 'test-icon-theme' }] }
  expect(featureIconThemeEnabled(extension)).toBe(true)
})

test('featureIconThemeEnabled returns true when extension has empty iconThemes array', () => {
  const extension = { iconThemes: [] }
  expect(featureIconThemeEnabled(extension)).toBe(true)
})

test('featureIconThemeEnabled returns false when extension has no iconThemes', () => {
  const extension = { name: 'test-extension' }
  expect(featureIconThemeEnabled(extension)).toBe(false)
})

test('featureIconThemeEnabled returns false when extension is null', () => {
  expect(featureIconThemeEnabled(null)).toBe(false)
})

test('featureIconThemeEnabled returns false when extension is undefined', () => {
  expect(featureIconThemeEnabled(undefined)).toBe(false)
})