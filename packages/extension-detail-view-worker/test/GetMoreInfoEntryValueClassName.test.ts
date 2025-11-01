import { expect, test } from '@jest/globals'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getMoreInfoEntryValueClassName } from '../src/parts/GetMoreInfoEntryValueClassName/GetMoreInfoEntryValueClassName.ts'
import * as MergeClassNames from '../src/parts/MergeClassNames/MergeClassNames.ts'

test('returns link class when onClick is string', () => {
  const expected: string = MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Link)
  const result: string = getMoreInfoEntryValueClassName('onClick', undefined)
  expect(result).toBe(expected)
})

test('returns link class when onClick is number', () => {
  const expected: string = MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Link)
  const result: string = getMoreInfoEntryValueClassName(123, undefined)
  expect(result).toBe(expected)
})

test('returns link class when onClick is non-zero number', () => {
  const expected: string = MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Link)
  const result: string = getMoreInfoEntryValueClassName(1, undefined)
  expect(result).toBe(expected)
})

test('returns code class when onClick is undefined and code is true', () => {
  const expected: string = MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Code)
  const result: string = getMoreInfoEntryValueClassName(undefined, true)
  expect(result).toBe(expected)
})

test('returns code class when onClick is 0 and code is true', () => {
  const expected: string = MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Code)
  const result: string = getMoreInfoEntryValueClassName(0, true)
  expect(result).toBe(expected)
})

test('returns code class when onClick is empty string and code is true', () => {
  const expected: string = MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Code)
  const result: string = getMoreInfoEntryValueClassName('', true)
  expect(result).toBe(expected)
})

test('returns base class when both onClick and code are undefined', () => {
  const result: string = getMoreInfoEntryValueClassName(undefined, undefined)
  expect(result).toBe(ClassNames.MoreInfoEntryValue)
})

test('returns base class when onClick is 0 and code is false', () => {
  const result: string = getMoreInfoEntryValueClassName(0, false)
  expect(result).toBe(ClassNames.MoreInfoEntryValue)
})

test('returns base class when onClick is empty string and code is false', () => {
  const result: string = getMoreInfoEntryValueClassName('', false)
  expect(result).toBe(ClassNames.MoreInfoEntryValue)
})

test('prefers onClick over code when both are truthy', () => {
  const expected: string = MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Link)
  const result: string = getMoreInfoEntryValueClassName('onClick', true)
  expect(result).toBe(expected)
})
