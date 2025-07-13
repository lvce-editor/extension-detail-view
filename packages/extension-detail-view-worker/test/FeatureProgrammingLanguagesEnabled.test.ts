import { expect, test } from '@jest/globals'
import { featureProgrammingLanguagesEnabled } from '../src/parts/FeatureProgrammingLanguagesEnabled/FeatureProgrammingLanguagesEnabled.ts'

test('featureProgrammingLanguagesEnabled returns true when extension has programmingLanguages', () => {
  const extension = { programmingLanguages: ['javascript', 'typescript'] }
  expect(featureProgrammingLanguagesEnabled(extension)).toBe(true)
})

test('featureProgrammingLanguagesEnabled returns false when extension has no programmingLanguages', () => {
  const extension = { name: 'test-extension' }
  expect(featureProgrammingLanguagesEnabled(extension)).toBe(false)
})

test('featureProgrammingLanguagesEnabled returns false when extension is null', () => {
  expect(featureProgrammingLanguagesEnabled(null)).toBe(false)
})

test('featureProgrammingLanguagesEnabled returns false when extension is undefined', () => {
  expect(featureProgrammingLanguagesEnabled(undefined)).toBe(false)
})

test('featureProgrammingLanguagesEnabled returns false when programmingLanguages is empty array', () => {
  const extension = { programmingLanguages: [] }
  expect(featureProgrammingLanguagesEnabled(extension)).toBe(false)
})
