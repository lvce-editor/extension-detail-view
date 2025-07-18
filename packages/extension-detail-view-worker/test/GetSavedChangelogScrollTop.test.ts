import { test, expect } from '@jest/globals'
import { getSavedChangelogScrollTop } from '../src/parts/GetSavedChangelogScrollTop/GetSavedChangelogScrollTop.ts'

test('should return changelogScrollTop when valid number is provided', () => {
  const savedState = { changelogScrollTop: 100 }
  const result = getSavedChangelogScrollTop(savedState)
  expect(result).toBe(100)
})

test('should return 0 when savedState is null', () => {
  const result = getSavedChangelogScrollTop(null)
  expect(result).toBe(0)
})

test('should return 0 when savedState is undefined', () => {
  const result = getSavedChangelogScrollTop(undefined)
  expect(result).toBe(0)
})

test('should return 0 when savedState is not an object', () => {
  const result = getSavedChangelogScrollTop('not an object')
  expect(result).toBe(0)
})

test('should return 0 when changelogScrollTop property does not exist', () => {
  const savedState = { otherProperty: 100 }
  const result = getSavedChangelogScrollTop(savedState)
  expect(result).toBe(0)
})

test('should return 0 when changelogScrollTop is not a number', () => {
  const savedState = { changelogScrollTop: 'not a number' }
  const result = getSavedChangelogScrollTop(savedState)
  expect(result).toBe(0)
})

test('should return NaN when changelogScrollTop is NaN', () => {
  const savedState = { changelogScrollTop: Number.NaN }
  const result = getSavedChangelogScrollTop(savedState)
  expect(result).toBe(Number.NaN)
})

test('should return Infinity when changelogScrollTop is Infinity', () => {
  const savedState = { changelogScrollTop: Infinity }
  const result = getSavedChangelogScrollTop(savedState)
  expect(result).toBe(Infinity)
})

test('should return -Infinity when changelogScrollTop is -Infinity', () => {
  const savedState = { changelogScrollTop: -Infinity }
  const result = getSavedChangelogScrollTop(savedState)
  expect(result).toBe(-Infinity)
})

test('should return 0 when changelogScrollTop is 0', () => {
  const savedState = { changelogScrollTop: 0 }
  const result = getSavedChangelogScrollTop(savedState)
  expect(result).toBe(0)
})

test('should return negative number when changelogScrollTop is negative', () => {
  const savedState = { changelogScrollTop: -50 }
  const result = getSavedChangelogScrollTop(savedState)
  expect(result).toBe(-50)
})
