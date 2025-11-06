import { test, expect } from '@jest/globals'
import * as FeatureProgrammingLanguagesDetails from '../src/parts/FeatureProgrammingLanguagesDetails/FeatureProgrammingLanguagesDetails.ts'

test('getFeatureDetailsProgrammingLanguages should return programming language details', async () => {
  const extension = {
    languages: [
      { id: 'typescript', configuration: true, extensions: ['.ts', '.tsx'] },
      { id: 'javascript', configuration: false, extensions: ['.js', '.jsx'] },
    ],
  }

  const result = await FeatureProgrammingLanguagesDetails.getFeatureDetailsProgrammingLanguages(extension)

  expect(result).toHaveProperty('programmingLanguages')
  expect(Array.isArray(result.programmingLanguages)).toBe(true)
  expect(result.programmingLanguages).toHaveLength(2)
})

test('getFeatureDetailsProgrammingLanguages should handle empty languages', async () => {
  const extension = {}

  const result = await FeatureProgrammingLanguagesDetails.getFeatureDetailsProgrammingLanguages(extension)

  expect(result).toEqual({
    programmingLanguages: [],
  })
})

test('getFeatureDetailsProgrammingLanguages should handle undefined languages', async () => {
  const extension: any = {
    languages: undefined,
  }

  const result = await FeatureProgrammingLanguagesDetails.getFeatureDetailsProgrammingLanguages(extension)

  expect(result).toEqual({
    programmingLanguages: [],
  })
})
