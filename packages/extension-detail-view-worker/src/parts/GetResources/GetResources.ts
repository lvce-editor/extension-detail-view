import type { Resource } from '../Resource/Resource.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'

export const getResources = (isBuiltin: boolean): readonly Resource[] => {
  if (isBuiltin) {
    return []
  }
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
      url: '#',
    },
    {
      label: ExtensionDetailStrings.license(),
      url: '#',
    },
  ]
}
