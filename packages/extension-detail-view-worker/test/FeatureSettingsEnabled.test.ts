import { expect, test } from '@jest/globals'
import { featureSettingsEnabled } from '../src/parts/FeatureSettingsEnabled/FeatureSettingsEnabled.ts'

test('featureSettingsEnabled returns true when extension has settings', () => {
  const extension = { settings: [{ title: 'Test Settings', properties: {} }] }
  expect(featureSettingsEnabled(extension)).toBe(true)
})

test('featureSettingsEnabled returns false when extension has no settings', () => {
  const extension = { name: 'test-extension' }
  expect(featureSettingsEnabled(extension)).toBe(false)
})

test('featureSettingsEnabled returns false when extension is null', () => {
  expect(featureSettingsEnabled(null)).toBe(false)
})

test('featureSettingsEnabled returns false when extension is undefined', () => {
  expect(featureSettingsEnabled(undefined)).toBe(false)
})

test('featureSettingsEnabled returns false when settings is empty array', () => {
  const extension = { settings: [] }
  expect(featureSettingsEnabled(extension)).toBe(false)
})
