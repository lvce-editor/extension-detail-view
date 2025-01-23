import { expect, test } from '@jest/globals'
import * as GetSavedSelectedFeature from '../src/parts/GetSavedSelectedFeature/GetSavedSelectedFeature.ts'

test('returns saved selected feature', () => {
  const savedState = {
    selectedFeature: 'Theme',
  }
  expect(GetSavedSelectedFeature.getSavedSelectedFeature(savedState)).toBe('Theme')
})

test('returns empty string when saved state is undefined', () => {
  expect(GetSavedSelectedFeature.getSavedSelectedFeature(undefined)).toBe('')
})

test('returns empty string when saved state is null', () => {
  expect(GetSavedSelectedFeature.getSavedSelectedFeature(null)).toBe('')
})

test('returns empty string when saved state is not an object', () => {
  expect(GetSavedSelectedFeature.getSavedSelectedFeature('not an object')).toBe('')
})

test('returns empty string when selectedFeature is missing', () => {
  const savedState = {
    otherProperty: 'value',
  }
  expect(GetSavedSelectedFeature.getSavedSelectedFeature(savedState)).toBe('')
})

test('returns empty string when selectedFeature is not a string', () => {
  const savedState = {
    selectedFeature: 123,
  }
  expect(GetSavedSelectedFeature.getSavedSelectedFeature(savedState)).toBe('')
})
