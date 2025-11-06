import type { Resource } from '../Resource/Resource.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getRepositoryLink } from '../GetRepositoryLink/GetRepositoryLink.ts'

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
