import { expect, test } from '@jest/globals'
import * as ParseCreated from '../src/parts/ParseCreated/ParseCreated.ts'

test('parseCreated returns null for undefined extension', () => {
  expect(ParseCreated.parseCreated(undefined)).toBe(null)
})

test('parseCreated returns null when created is missing', () => {
  expect(ParseCreated.parseCreated({})).toBe(null)
})

test('parseCreated returns null when created is invalid', () => {
  expect(ParseCreated.parseCreated({ created: 'invalid' })).toBe(null)
})

test('parseCreated returns timestamp when created is an iso date string', () => {
  expect(ParseCreated.parseCreated({ created: '2024-01-15T00:00:00.000Z' })).toBe(1_705_276_800_000)
})

test('parseCreated returns timestamp when created is an iso date', () => {
  expect(ParseCreated.parseCreated({ created: '2024-01-15' })).toBe(1_705_276_800_000)
})
