import { expect, test } from '@jest/globals'
import * as FormatCreated from '../src/parts/FormatCreated/FormatCreated.ts'

test('formatCreated returns n/a for null', () => {
  expect(FormatCreated.formatCreated(null)).toBe('n/a')
})

test('formatCreated returns relative time for past date', () => {
  const created = new Date('2024-01-15').getTime()
  const now = new Date('2026-07-09').getTime()
  expect(FormatCreated.formatCreated(created, now)).toBe('2 years ago')
})

test('formatCreated returns relative time for future date', () => {
  const created = new Date('2026-07-09').getTime()
  const now = new Date('2024-01-15').getTime()
  expect(FormatCreated.formatCreated(created, now)).toBe('in 2 years')
})
