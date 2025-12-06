import { expect, test } from '@jest/globals'
import * as FeatureSettingsEnabled from '../src/parts/FeatureSettingsEnabled/FeatureSettingsEnabled.ts'

test('featureSettingsEnabled returns true when extension has settings', () => {
  const extension: unknown = { settings: [{ properties: {}, title: 'Test Settings' }] }
  expect(FeatureSettingsEnabled.featureSettingsEnabled(extension)).toBe(true)
})

test('featureSettingsEnabled returns false when extension has no settings', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(FeatureSettingsEnabled.featureSettingsEnabled(extension)).toBe(false)
})

test('featureSettingsEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(FeatureSettingsEnabled.featureSettingsEnabled(extension)).toBe(false)
})

test('featureSettingsEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(FeatureSettingsEnabled.featureSettingsEnabled(extension)).toBe(false)
})

test('featureSettingsEnabled returns true when settings is empty array', () => {
  const extension: unknown = { settings: [] }
  expect(FeatureSettingsEnabled.featureSettingsEnabled(extension)).toBe(true)
})
