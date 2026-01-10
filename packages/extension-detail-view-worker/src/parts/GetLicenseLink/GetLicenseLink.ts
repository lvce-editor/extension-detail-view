import { getRepositoryLink } from '../GetRepositoryLink/GetRepositoryLink.ts'

const isGitHubRepository = (url: string): boolean => {
  return url.startsWith('https://github.com/')
}

export const getLicenseLink = (extension: unknown): string => {
  const repositoryLink = getRepositoryLink(extension)
  if (!repositoryLink) {
    return '#'
  }
  if (isGitHubRepository(repositoryLink)) {
    const normalizedLink = repositoryLink.replace(/\/+$/, '')
    return `${normalizedLink}/blob/main/LICENSE`
  }
  return '#'
}
