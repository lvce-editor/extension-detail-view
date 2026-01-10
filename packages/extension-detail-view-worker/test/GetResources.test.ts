import { expect, test } from '@jest/globals'
import * as GetResources from '../src/parts/GetResources/GetResources.ts'

test('getResources returns all resources', () => {
  const resources = GetResources.getResources(false, {})
  expect(resources).toEqual([
    {
      enabled: true,
      icon: 'LinkExternal',
      label: 'Marketplace',
      url: '#',
    },
    {
      enabled: true,
      icon: 'LinkExternal',
      label: 'Issues',
      url: '',
    },
    {
      enabled: true,
      icon: 'Repo',
      label: 'Repository',
      url: '',
    },
    {
      enabled: true,
      icon: 'LinkExternal',
      label: 'License',
      url: '#',
    },
  ])
})

test('getResources returns resources without marketplace link when isBuiltin is true', () => {
  const resources = GetResources.getResources(true, {})
  expect(resources).toEqual([
    {
      enabled: true,
      icon: 'LinkExternal',
      label: 'Issues',
      url: '',
    },
    {
      enabled: true,
      icon: 'Repo',
      label: 'Repository',
      url: '',
    },
    {
      enabled: true,
      icon: 'LinkExternal',
      label: 'License',
      url: '#',
    },
  ])
})

test('getResources returns repository link when extension.repository is a string', () => {
  const extension = {
    repository: 'https://github.com/example/repo',
  }
  const resources = GetResources.getResources(false, extension)
  expect(resources[2].url).toBe('https://github.com/example/repo')
  expect(resources[1].url).toBe('https://github.com/example/repo/issues')
})
