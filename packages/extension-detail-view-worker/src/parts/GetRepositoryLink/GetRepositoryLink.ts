import { ensureValidLink } from '../EnsureValidLink/EnsureValidLink.ts'
import { hasProperty } from '../HasProperty/HasProperty.ts'

const getRepositoryLinkRaw = (extension: unknown): string => {
  if (extension && hasProperty(extension, 'repository') && typeof extension.repository === 'string') {
    return extension.repository // TODO watch out for javascript: or other invalid links or path traversal
  }
  return ''
}

export const getRepositoryLink = (extension: unknown): string => {
  const raw = getRepositoryLinkRaw(extension)
  const validLink = ensureValidLink(raw)
  return validLink
}

export const getIssuesLink = (extension: unknown): string => {
  const repositoryLink = getRepositoryLink(extension)
  if (!repositoryLink) {
    return ''
  }
  if (repositoryLink && repositoryLink.startsWith('https://github.com')) {
    return `${repositoryLink}/issues`
  }
  return ''
}
