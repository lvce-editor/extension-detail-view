import type { Resource } from '../Resource/Resource.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { hasProperty } from '../HasProperty/HasProperty.ts'

const getRepositoryLink = (extension: unknown): string => {
  if (extension && hasProperty(extension, 'repository') && typeof extension.repository === 'string') {
    return extension.repository // TODO watch out for javascript: or other invalid links or path traversal
  }
  return ''
}

export const getResources = (isBuiltin: boolean, extension: unknown): readonly Resource[] => {
  if (isBuiltin) {
    return []
  }
  const repositoryLink = getRepositoryLink(extension)
  // TODO
  return [
    {
      label: ExtensionDetailStrings.marketplace(),
      url: '#',
    },
    {
      label: ExtensionDetailStrings.issues(),
      url: '#',
    },
    {
      label: ExtensionDetailStrings.repository(),
      url: repositoryLink,
    },
    {
      label: ExtensionDetailStrings.license(),
      url: '#',
    },
  ]
}
