import { expect, test } from '@jest/globals'
import { getEntries } from '../src/parts/GetEntries/GetEntries.ts'

test('getEntries returns correct entries', () => {
  const result = getEntries()
  expect(result).toEqual([
    { key: 'Identifier', value: 'abc' },
    { key: 'Version', value: '1.9.5' },
    { key: 'Last Updated', value: 'n/a' },
  ])
})
