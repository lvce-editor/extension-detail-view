import { expect, test } from '@jest/globals'
import * as FormatLastUpdated from '../src/parts/FormatLastUpdated/FormatLastUpdated.ts'

test('formatLastUpdated returns n/a for null', () => {
  expect(FormatLastUpdated.formatLastUpdated(null)).toBe('n/a')
})

test('formatLastUpdated returns relative time for a past date', () => {
  const lastUpdated = new Date('2024-01-15').getTime()
  const now = new Date('2024-02-15').getTime()
  expect(FormatLastUpdated.formatLastUpdated(lastUpdated, now)).toBe('1 month ago')
})

test('formatLastUpdated returns relative time for a future date', () => {
  const lastUpdated = new Date('2024-02-15').getTime()
  const now = new Date('2024-01-15').getTime()
  expect(FormatLastUpdated.formatLastUpdated(lastUpdated, now)).toBe('in 1 month')
})

test('formatLastUpdated returns n/a for invalid timestamp', () => {
  expect(FormatLastUpdated.formatLastUpdated(Number.NaN)).toBe('n/a')
})
