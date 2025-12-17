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

test.skip('getResources returns empty array when isBuiltin is true', () => {
  const resources = GetResources.getResources(true, {})
  expect(resources).toEqual([])
})

test.skip('getResources returns repository link when extension.repository is a string', () => {
  const extension = {
    repository: 'https://github.com/example/repo',
  }
  const resources = GetResources.getResources(false, extension)
  expect(resources[1].url).toBe('https://github.com/example/repo')
})
