import { expect, test } from '@jest/globals'
import * as GetMarketplaceEntries from '../src/parts/GetMarketplaceEntries/GetMarketplaceEntries.ts'

test('returns marketplace entries', () => {
  expect(GetMarketplaceEntries.getMarketplaceEntries(false)).toEqual([
    {
      code: undefined,
      key: 'Published',
      odd: true,
      onClick: undefined,
      title: undefined,
      value: 'n/a',
    },
    {
      code: undefined,
      key: 'Last Released',
      odd: undefined,
      onClick: undefined,
      title: undefined,
      value: 'n/a',
    },
  ])
})

test('returns empty array for builtin extensions', () => {
  expect(GetMarketplaceEntries.getMarketplaceEntries(true)).toEqual([])
})
