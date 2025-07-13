import { expect, test } from '@jest/globals'
import { featureProgrammingLanguagesEnabled } from '../src/parts/FeatureProgrammingLanguagesEnabled/FeatureProgrammingLanguagesEnabled.ts'

test('featureProgrammingLanguagesEnabled returns programmingLanguages when extension has programmingLanguages', () => {
  const extension = { programmingLanguages: ['javascript', 'typescript'] }
  expect(featureProgrammingLanguagesEnabled(extension)).toEqual(['javascript', 'typescript'])
})

test('featureProgrammingLanguagesEnabled returns undefined when extension has no programmingLanguages', () => {
  const extension = { name: 'test-extension' }
  expect(featureProgrammingLanguagesEnabled(extension)).toBeUndefined()
})

test('featureProgrammingLanguagesEnabled returns null when extension is null', () => {
  expect(featureProgrammingLanguagesEnabled(null)).toBeNull()
})

test('featureProgrammingLanguagesEnabled returns undefined when extension is undefined', () => {
  expect(featureProgrammingLanguagesEnabled(undefined)).toBeUndefined()
})

test('featureProgrammingLanguagesEnabled returns empty array when programmingLanguages is empty array', () => {
  const extension = { programmingLanguages: [] }
  expect(featureProgrammingLanguagesEnabled(extension)).toEqual([])
})