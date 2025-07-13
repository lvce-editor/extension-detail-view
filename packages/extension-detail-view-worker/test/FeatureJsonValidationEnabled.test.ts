import { expect, test } from '@jest/globals'
import { featureJsonValidationEnabled } from '../src/parts/FeatureJsonValidationEnabled/FeatureJsonValidationEnabled.ts'

test('featureJsonValidationEnabled returns true when extension has jsonValidation', () => {
  const extension: unknown = { jsonValidation: [{ fileMatch: '*.json', url: 'schema.json' }] }
  expect(featureJsonValidationEnabled(extension)).toBe(true)
})

test('featureJsonValidationEnabled returns false when extension has no jsonValidation', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(featureJsonValidationEnabled(extension)).toBe(false)
})

test('featureJsonValidationEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(featureJsonValidationEnabled(extension)).toBe(false)
})

test('featureJsonValidationEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(featureJsonValidationEnabled(extension)).toBe(false)
})

test('featureJsonValidationEnabled returns false when jsonValidation is empty array', () => {
  const extension: unknown = { jsonValidation: [] }
  expect(featureJsonValidationEnabled(extension)).toBe(false)
})
