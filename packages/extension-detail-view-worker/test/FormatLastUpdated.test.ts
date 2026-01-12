import { expect, test } from '@jest/globals'
import * as FormatLastUpdated from '../src/parts/FormatLastUpdated/FormatLastUpdated.ts'

test('formatLastUpdated returns n/a for null', () => {
  expect(FormatLastUpdated.formatLastUpdated(null)).toBe('n/a')
})

test('formatLastUpdated returns formatted date for valid timestamp', () => {
  const timestamp = new Date('2024-01-15').getTime()
  const result = FormatLastUpdated.formatLastUpdated(timestamp)
  expect(result).not.toBe('n/a')
  expect(result).toBe('Jan 27, 56008')
})

test('formatLastUpdated returns n/a for invalid timestamp', () => {
  expect(FormatLastUpdated.formatLastUpdated(Number.NaN)).toBe('n/a')
})
