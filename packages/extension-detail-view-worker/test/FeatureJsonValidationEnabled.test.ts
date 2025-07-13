import { expect, test } from '@jest/globals'
import * as FeatureJsonValidationEnabled from '../src/parts/FeatureJsonValidationEnabled/FeatureJsonValidationEnabled.ts'

test('featureJsonValidationEnabled returns true when extension has jsonValidation', () => {
  const extension: unknown = { jsonValidation: [{ fileMatch: '*.json', url: 'schema.json' }] }
  expect(FeatureJsonValidationEnabled.featureJsonValidationEnabled(extension)).toBe(true)
})

test('featureJsonValidationEnabled returns false when extension has no jsonValidation', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(FeatureJsonValidationEnabled.featureJsonValidationEnabled(extension)).toBe(false)
})

test('featureJsonValidationEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(FeatureJsonValidationEnabled.featureJsonValidationEnabled(extension)).toBe(false)
})

test('featureJsonValidationEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(FeatureJsonValidationEnabled.featureJsonValidationEnabled(extension)).toBe(false)
})

test('featureJsonValidationEnabled returns true when jsonValidation is empty array', () => {
  const extension: unknown = { jsonValidation: [] }
  expect(FeatureJsonValidationEnabled.featureJsonValidationEnabled(extension)).toBe(true)
})
