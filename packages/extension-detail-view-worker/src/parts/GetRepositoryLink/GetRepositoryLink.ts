import { hasProperty } from '../HasProperty/HasProperty.ts'

const getRepositoryLinkRaw = (extension: unknown): string => {
  if (extension && hasProperty(extension, 'repository') && typeof extension.repository === 'string') {
    return extension.repository // TODO watch out for javascript: or other invalid links or path traversal
  }
  return ''
}

const ensureValidLink = (link: string): string => {
  if (!link) {
    return ''
  }
  const parsed = new URL(link)
  if (parsed.protocol !== 'https:') {
    return ''
  }
  return link
}

export const getRepositoryLink = (extension: unknown): string => {
  const raw = getRepositoryLinkRaw(extension)
  const validLink = ensureValidLink(raw)
  return validLink
}
