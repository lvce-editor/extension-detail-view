import { expect, test } from '@jest/globals'
import { featureJsonValidationEnabled } from '../src/parts/FeatureJsonValidationEnabled/FeatureJsonValidationEnabled.ts'

test('featureJsonValidationEnabled returns true when extension has jsonValidation', () => {
  const extension = { jsonValidation: [{ fileMatch: '*.json', url: 'schema.json' }] }
  expect(featureJsonValidationEnabled(extension)).toBe(true)
})

test('featureJsonValidationEnabled returns false when extension has no jsonValidation', () => {
  const extension = { name: 'test-extension' }
  expect(featureJsonValidationEnabled(extension)).toBe(false)
})

test('featureJsonValidationEnabled returns false when extension is null', () => {
  expect(featureJsonValidationEnabled(null)).toBe(false)
})

test('featureJsonValidationEnabled returns false when extension is undefined', () => {
  expect(featureJsonValidationEnabled(undefined)).toBe(false)
})

test('featureJsonValidationEnabled returns false when jsonValidation is empty array', () => {
  const extension = { jsonValidation: [] }
  expect(featureJsonValidationEnabled(extension)).toBe(false)
})