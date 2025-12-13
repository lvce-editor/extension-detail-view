import { expect, test } from '@jest/globals'
import * as GetMarketplaceEntries from '../src/parts/GetMarketplaceEntries/GetMarketplaceEntries.ts'

test('returns marketplace entries', () => {
  expect(GetMarketplaceEntries.getMarketplaceEntries(false)).toEqual([
    {
      key: 'Published',
      odd: true,
      value: 'n/a',
    },
    {
      key: 'Last Released',
      value: 'n/a',
    },
  ])
})

test('returns empty array for builtin extensions', () => {
  expect(GetMarketplaceEntries.getMarketplaceEntries(true)).toEqual([])
})
