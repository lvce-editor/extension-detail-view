import type { Resource } from '../Resource/Resource.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getIssuesLink } from '../GetIssuesLink/GetIssuesLink.ts'
import { getLicenseLink } from '../GetLicenseLink/GetLicenseLink.ts'
import { getRepositoryLink } from '../GetRepositoryLink/GetRepositoryLink.ts'

export const getResources = (isBuiltin: boolean, extension: unknown): readonly Resource[] => {
  const repositoryLink = getRepositoryLink(extension)
  const issueLink = getIssuesLink(extension)
  const licenseLink = getLicenseLink(extension)
  // TODO hide marketplace link for builtin extensions
  return [
    {
      icon: 'LinkExternal',
      label: ExtensionDetailStrings.marketplace(),
      url: '#',
    },
    {
      icon: 'LinkExternal',
      label: ExtensionDetailStrings.issues(),
      url: issueLink,
    },
    {
      icon: 'Repo',
      label: ExtensionDetailStrings.repository(),
      url: repositoryLink,
    },
    {
      icon: 'LinkExternal',
      label: ExtensionDetailStrings.license(),
      url: licenseLink,
    },
  ]
}
