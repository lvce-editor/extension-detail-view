import { expect, test } from '@jest/globals'
import * as ParseLastUpdated from '../src/parts/ParseLastUpdated/ParseLastUpdated.ts'

test('parseLastUpdated returns null for undefined extension', () => {
  expect(ParseLastUpdated.parseLastUpdated(undefined)).toBe(null)
})

test('parseLastUpdated returns null for null extension', () => {
  expect(ParseLastUpdated.parseLastUpdated(null)).toBe(null)
})

test('parseLastUpdated returns null for non-object extension', () => {
  expect(ParseLastUpdated.parseLastUpdated('string')).toBe(null)
})

test('parseLastUpdated returns null when lastUpdated is undefined', () => {
  const extension = {}
  expect(ParseLastUpdated.parseLastUpdated(extension)).toBe(null)
})

test('parseLastUpdated returns null when lastUpdated is null', () => {
  const extension = { lastUpdated: null }
  expect(ParseLastUpdated.parseLastUpdated(extension)).toBe(null)
})

test('parseLastUpdated returns number when lastUpdated is a valid number', () => {
  const extension = { lastUpdated: 1_705_276_800_000 }
  expect(ParseLastUpdated.parseLastUpdated(extension)).toBe(1_705_276_800_000)
})

test('parseLastUpdated returns number when lastUpdated is a valid string number', () => {
  const extension = { lastUpdated: '1705276800000' }
  expect(ParseLastUpdated.parseLastUpdated(extension)).toBe(1_705_276_800_000)
})

test('parseLastUpdated returns null when lastUpdated is an invalid string', () => {
  const extension = { lastUpdated: 'invalid' }
  expect(ParseLastUpdated.parseLastUpdated(extension)).toBe(null)
})

test('parseLastUpdated returns null when lastUpdated is zero', () => {
  const extension = { lastUpdated: 0 }
  expect(ParseLastUpdated.parseLastUpdated(extension)).toBe(null)
})

test('parseLastUpdated returns null when lastUpdated is negative', () => {
  const extension = { lastUpdated: -1 }
  expect(ParseLastUpdated.parseLastUpdated(extension)).toBe(null)
})
