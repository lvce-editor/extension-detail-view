import { test, expect } from '@jest/globals'
import { getSavedReadmeScrollTop } from '../src/parts/GetSavedReadmeScrollTop/GetSavedReadmeScrollTop.ts'

test('returns scrollTop if present', () => {
  expect(getSavedReadmeScrollTop({ readmeScrollTop: 42 })).toBe(42)
})

test('returns 0 if readmeScrollTop is missing', () => {
  expect(getSavedReadmeScrollTop({})).toBe(0)
})

test('returns 0 if input is null', () => {
  expect(getSavedReadmeScrollTop(null)).toBe(0)
})

test('returns 0 if readmeScrollTop is not a number', () => {
  expect(getSavedReadmeScrollTop({ readmeScrollTop: 'foo' })).toBe(0)
})
