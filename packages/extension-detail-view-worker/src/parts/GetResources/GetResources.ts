import type { Resource } from '../Resource/Resource.ts'

export const getResources = (isBuiltin: boolean): readonly Resource[] => {
  if (isBuiltin) {
    return []
  }
  // TODO
  return [
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
  ]
}
