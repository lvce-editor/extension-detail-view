import { expect, test } from '@jest/globals'
import { featureProgrammingLanguagesEnabled } from '../src/parts/FeatureProgrammingLanguagesEnabled/FeatureProgrammingLanguagesEnabled.ts'

test('featureProgrammingLanguagesEnabled returns true when extension has programmingLanguages', () => {
  const extension: unknown = { programmingLanguages: ['javascript', 'typescript'] }
  expect(featureProgrammingLanguagesEnabled(extension)).toBe(true)
})

test('featureProgrammingLanguagesEnabled returns false when extension has no programmingLanguages', () => {
  const extension: unknown = { name: 'test-extension' }
  expect(featureProgrammingLanguagesEnabled(extension)).toBe(false)
})

test('featureProgrammingLanguagesEnabled returns false when extension is null', () => {
  const extension: unknown = null
  expect(featureProgrammingLanguagesEnabled(extension)).toBe(false)
})

test('featureProgrammingLanguagesEnabled returns false when extension is undefined', () => {
  const extension: unknown = undefined
  expect(featureProgrammingLanguagesEnabled(extension)).toBe(false)
})

test('featureProgrammingLanguagesEnabled returns false when programmingLanguages is empty array', () => {
  const extension: unknown = { programmingLanguages: [] }
  expect(featureProgrammingLanguagesEnabled(extension)).toBe(false)
})
