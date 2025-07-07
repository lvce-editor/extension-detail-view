import { expect, test } from '@jest/globals'
import { getCategories } from '../src/parts/GetCategories/GetCategories.ts'

test('getCategories returns themes category', () => {
  const categories = getCategories()
  expect(categories).toEqual([
    {
      id: 'themes',
      label: 'Themes',
    },
  ])
})