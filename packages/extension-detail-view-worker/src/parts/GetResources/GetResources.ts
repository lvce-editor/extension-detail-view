import type { Resource } from '../Resource/Resource.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getIssuesLink } from '../GetIssuesLink/GetIssuesLink.ts'
import { getLicenseLink } from '../GetLicenseLink/GetLicenseLink.ts'
import { getRepositoryLink } from '../GetRepositoryLink/GetRepositoryLink.ts'

interface RawResource extends Resource {
  readonly enabled: boolean
}

export const getResources = (isBuiltin: boolean, extension: unknown): readonly Resource[] => {
  const repositoryLink = getRepositoryLink(extension)
  const issueLink = getIssuesLink(extension)
  const licenseLink = getLicenseLink(extension)
  const rawResources: RawResource[] = [
    {
      enabled: !isBuiltin,
      icon: 'LinkExternal',
      label: ExtensionDetailStrings.marketplace(),
      url: '#',
    },
    {
      enabled: true,
      icon: 'LinkExternal',
      label: ExtensionDetailStrings.issues(),
      url: issueLink,
    },
    {
      enabled: true,
      icon: 'Repo',
      label: ExtensionDetailStrings.repository(),
      url: repositoryLink,
    },
    {
      enabled: true,
      icon: 'LinkExternal',
      label: ExtensionDetailStrings.license(),
      url: licenseLink,
    },
  ]
  return rawResources.filter((resource) => resource.enabled)
}
