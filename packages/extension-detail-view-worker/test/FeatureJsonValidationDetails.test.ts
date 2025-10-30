import { test, expect } from '@jest/globals'
import * as FeatureJsonValidationDetails from '../src/parts/FeatureJsonValidationDetails/FeatureJsonValidationDetails.ts'

test('getJsonValidationDetails should return json validation details', async () => {
  const extension = {
    jsonValidation: [
      { fileMatch: '*.json', url: 'schemas/schema.json' },
      { fileMatch: '*.tsconfig.json', url: 'schemas/tsconfig-schema.json' },
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
