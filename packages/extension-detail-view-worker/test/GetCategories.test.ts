import { expect, test } from '@jest/globals'
import { getCategories } from '../src/parts/GetCategories/GetCategories.ts'

test('getCategories returns themes category', () => {
  const categories = getCategories({
    categories: ['Themes'],
  })
  expect(categories).toEqual([
    {
      id: 'themes',
      label: 'Themes',
    },
  ])
})

test('getCategories stringifies non-string categories', () => {
  const categories = getCategories({
    categories: [{ name: 'Themes' }],
  })
  expect(categories).toEqual([
    {
      id: '{"name":"themes"}',
      label: '{"name":"Themes"}',
    },
  ])
})
