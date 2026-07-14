import type { GithubRepository } from '../GithubRepository/GithubRepository.ts'
import { hasProperty } from '../HasProperty/HasProperty.ts'

const segmentRegex = /^[\w.-]+$/

const getRepositoryUrl = (extension: unknown): string => {
  if (!extension || !hasProperty(extension, 'repository')) {
    return ''
  }
  const { repository } = extension
  if (typeof repository === 'string') {
    return repository
  }
  if (repository && hasProperty(repository, 'url') && typeof repository.url === 'string') {
    return repository.url
  }
  return ''
}

export const getGithubRepository = (extension: unknown): GithubRepository | undefined => {
  const rawUrl = getRepositoryUrl(extension).replace(/^git\+/, '')
  try {
    const url = new URL(rawUrl)
    if (url.protocol !== 'https:' || url.hostname.toLowerCase() !== 'github.com' || url.username || url.password || url.port) {
      return undefined
    }
    const segments = url.pathname.split('/').filter(Boolean)
    if (segments.length !== 2) {
      return undefined
    }
    const owner = segments[0]
    const repository = segments[1].replace(/\.git$/i, '')
    if (!owner || !repository || !segmentRegex.test(owner) || !segmentRegex.test(repository)) {
      return undefined
    }
    return { owner, repository }
  } catch {
    return undefined
  }
}
