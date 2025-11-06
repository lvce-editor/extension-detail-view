import { expect, test } from '@jest/globals'
import { getMenuIds } from '../src/parts/GetMenuIds/GetMenuIds.ts'

test('getMenuIds returns correct menu IDs', () => {
  const result = getMenuIds()
  expect(result).toBeDefined()
})
