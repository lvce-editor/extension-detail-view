import { expect, test } from '@jest/globals'
import { getResources } from '../src/parts/GetResources/GetResources.ts'

test('getResources returns all resources', () => {
  const resources = getResources()
  expect(resources).toEqual([
    {
      label: 'Marketplace',
      url: '#',
    },
    {
      label: 'Issues',
      url: '#',
    },
    {
      label: 'Repository',
      url: '#',
    },
    {
      label: 'License',
      url: '#',
    },
  ])
})