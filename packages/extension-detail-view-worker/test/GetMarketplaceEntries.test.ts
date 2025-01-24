import { expect, test } from '@jest/globals'
import * as GetMarketplaceEntries from '../src/parts/GetMarketplaceEntries/GetMarketplaceEntries.ts'

test('returns marketplace entries', () => {
  expect(GetMarketplaceEntries.getMarketplaceEntries()).toEqual([
    {
      key: 'Published',
      value: 'n/a',
    },
    {
      key: 'Last Released',
      value: 'n/a',
    },
  ])
})
