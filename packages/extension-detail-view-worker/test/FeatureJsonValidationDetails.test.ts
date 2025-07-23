import { test, expect } from '@jest/globals'
import * as FeatureJsonValidationDetails from '../src/parts/FeatureJsonValidationDetails/FeatureJsonValidationDetails.ts'

test('getJsonValidationDetails should return json validation details', async () => {
  const extension = {
    jsonValidation: [
      { fileMatch: '*.json', url: 'https://example.com/schema.json' },
      { fileMatch: '*.tsconfig.json', url: 'https://example.com/tsconfig-schema.json' },
    ],
  }

  const result = await FeatureJsonValidationDetails.getJsonValidationDetails(extension)

  expect(result).toHaveProperty('jsonValidation')
  expect(Array.isArray(result.jsonValidation)).toBe(true)
  expect(result.jsonValidation).toHaveLength(2)
})

test('getJsonValidationDetails should handle empty validations', async () => {
  const extension = {}

  const result = await FeatureJsonValidationDetails.getJsonValidationDetails(extension)

  expect(result).toEqual({
    jsonValidation: [],
  })
})
