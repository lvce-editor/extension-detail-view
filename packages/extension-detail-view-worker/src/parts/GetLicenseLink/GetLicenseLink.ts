import { getRepositoryLink } from '../GetRepositoryLink/GetRepositoryLink.ts'

const isGitHubRepository = (url: string): boolean => {
  return url.startsWith('https://github.com/')
}

const removeTrailingSlashes = (value: string): string => {
  let end = value.length
  while (end > 0 && value[end - 1] === '/') {
    end--
  }
  return value.slice(0, end)
}

export const getLicenseLink = (extension: unknown): string => {
  const repositoryLink = getRepositoryLink(extension)
  if (!repositoryLink) {
    return '#'
  }
  if (isGitHubRepository(repositoryLink)) {
    const normalizedLink = removeTrailingSlashes(repositoryLink)
    return `${normalizedLink}/blob/main/LICENSE`
  }
  return '#'
}
