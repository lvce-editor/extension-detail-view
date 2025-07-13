import { expect, test } from '@jest/globals'
import { featureSettingsEnabled } from '../src/parts/FeatureSettingsEnabled/FeatureSettingsEnabled.ts'

test('featureSettingsEnabled returns true when extension has settings', () => {
  const extension: unknown = { settings: [{ title: 'Test Settings', properties: {} }] }
  expect(featureSettingsEnabled(extension)).toBe(true)
})

test('featureSettingsEnabled returns false when extension has no settings', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(featureSettingsEnabled(extension)).toBe(false)
})

test('featureSettingsEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(featureSettingsEnabled(extension)).toBe(false)
})

test('featureSettingsEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(featureSettingsEnabled(extension)).toBe(false)
})

test('featureSettingsEnabled returns false when settings is empty array', () => {
  const extension: unknown = { settings: [] }
  expect(featureSettingsEnabled(extension)).toBe(false)
})
