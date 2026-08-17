import { expect, jest, test } from '@jest/globals'
import * as FormatCreated from '../src/parts/FormatCreated/FormatCreated.ts'

test('formatCreated uses English when the runtime locale is German', async () => {
  const OriginalRelativeTimeFormat = Intl.RelativeTimeFormat
  class GermanDefaultRelativeTimeFormat extends OriginalRelativeTimeFormat {
    constructor(locales?: Intl.LocalesArgument, options?: Intl.RelativeTimeFormatOptions) {
      super(locales ?? 'de', options)
    }
  }
  Intl.RelativeTimeFormat = GermanDefaultRelativeTimeFormat
  try {
    jest.resetModules()
    const { formatCreated } = await import('../src/parts/FormatCreated/FormatCreated.ts')
    const created = new Date('2024-01-15').getTime()
    const now = new Date('2026-07-09').getTime()
    expect(formatCreated(created, now)).toBe('2 years ago')
  } finally {
    Intl.RelativeTimeFormat = OriginalRelativeTimeFormat
    jest.resetModules()
  }
})

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

test('formatCreated returns n/a for a non-finite timestamp', () => {
  expect(FormatCreated.formatCreated(Number.NaN)).toBe('n/a')
})

test.each([
  [45 * 24 * 60 * 60 * 1000, '1 month ago'],
  [2 * 24 * 60 * 60 * 1000, '2 days ago'],
  [2 * 60 * 60 * 1000, '2 hours ago'],
  [2 * 60 * 1000, '2 minutes ago'],
])('formatCreated selects the appropriate relative unit', (difference, expected) => {
  expect(FormatCreated.formatCreated(0, difference)).toBe(expected)
})
