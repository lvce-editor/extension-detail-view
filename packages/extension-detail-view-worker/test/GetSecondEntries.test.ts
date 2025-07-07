import { expect, test } from '@jest/globals'
import { getSecondEntries } from '../src/parts/GetSecondEntries/GetSecondEntries.ts'

test('getSecondEntries returns correct entries', () => {
  const result = getSecondEntries()
  expect(result).toEqual([
    { key: 'Published', value: 'n/a' },
    { key: 'Last Released', value: 'n/a' },
  ])
})
