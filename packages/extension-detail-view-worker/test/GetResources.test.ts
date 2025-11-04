import { expect, test } from '@jest/globals'
import * as GetResources from '../src/parts/GetResources/GetResources.ts'

test.skip('getResources returns all resources', () => {
  const resources = GetResources.getResources(false, {})
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
