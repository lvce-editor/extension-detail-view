import { getRepositoryLink } from '../GetRepositoryLink/GetRepositoryLink.ts'

const isGitHubRepository = (url: string): boolean => {
  return url.startsWith('https://github.com/')
}

export const getIssuesLink = (extension: unknown): string => {
  const repositoryLink = getRepositoryLink(extension)
  if (!repositoryLink) {
    return ''
  }
  if (isGitHubRepository(repositoryLink)) {
    return `${repositoryLink}/issues`
  }
  return ''
}
