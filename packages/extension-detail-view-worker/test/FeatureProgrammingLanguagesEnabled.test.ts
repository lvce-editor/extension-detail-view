import { expect, test } from '@jest/globals'
import * as FeatureProgrammingLanguagesEnabled from '../src/parts/FeatureProgrammingLanguagesEnabled/FeatureProgrammingLanguagesEnabled.ts'

test('featureProgrammingLanguagesEnabled returns true when extension has programmingLanguages', () => {
  const extension: unknown = { programmingLanguages: ['javascript', 'typescript'] }
  expect(FeatureProgrammingLanguagesEnabled.featureProgrammingLanguagesEnabled(extension)).toBe(true)
})

test('featureProgrammingLanguagesEnabled returns false when extension has no programmingLanguages', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(FeatureProgrammingLanguagesEnabled.featureProgrammingLanguagesEnabled(extension)).toBe(false)
})

test('featureProgrammingLanguagesEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(FeatureProgrammingLanguagesEnabled.featureProgrammingLanguagesEnabled(extension)).toBe(false)
})

test('featureProgrammingLanguagesEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(FeatureProgrammingLanguagesEnabled.featureProgrammingLanguagesEnabled(extension)).toBe(false)
})

test('featureProgrammingLanguagesEnabled returns true when programmingLanguages is empty array', () => {
  const extension: unknown = { programmingLanguages: [] }
  expect(FeatureProgrammingLanguagesEnabled.featureProgrammingLanguagesEnabled(extension)).toBe(true)
})
