import type { GithubRelease } from '../GithubRelease/GithubRelease.ts'
import type { GithubRepository } from '../GithubRepository/GithubRepository.ts'
import * as GithubApiRequest from '../GithubApiRequest/GithubApiRequest.ts'
import { GithubReleasesError } from '../GithubReleasesError/GithubReleasesError.ts'
import { hasProperty } from '../HasProperty/HasProperty.ts'

const pageSize = 100
const maximumReleases = 100

export interface GithubReleasesResult {
  readonly isTruncated: boolean
  readonly releases: readonly GithubRelease[]
}

const getErrorMessage = async (response: Response): Promise<string> => {
  try {
    const body: unknown = await response.clone().json()
    if (body && hasProperty(body, 'message') && typeof body.message === 'string') {
      return body.message
    }
  } catch {
    // The status code still provides a useful error when the error body is invalid.
  }
  return ''
}

const getHttpError = async (response: Response): Promise<GithubReleasesError> => {
  const apiMessage = await getErrorMessage(response)
  const rateLimitRemaining = response.headers.get('x-ratelimit-remaining')
  if (response.status === 429 || (response.status === 403 && (rateLimitRemaining === '0' || /rate limit/i.test(apiMessage)))) {
    const resetValue = Number(response.headers.get('x-ratelimit-reset'))
    const retry =
      Number.isFinite(resetValue) && resetValue > 0 ? ` Try again after ${new Date(resetValue * 1000).toLocaleString()}.` : ' Please try again later.'
    return new GithubReleasesError(`GitHub API rate limit exceeded.${retry}`)
  }
  if (response.status === 404) {
    return new GithubReleasesError('The GitHub repository could not be found or is not publicly reachable.')
  }
  if (response.status >= 500) {
    return new GithubReleasesError(`GitHub is temporarily unavailable (server error ${response.status}). Please try again later.`)
  }
  if (response.status >= 400) {
    const detail = apiMessage ? `: ${apiMessage}` : ''
    return new GithubReleasesError(`GitHub rejected the releases request (${response.status} ${response.statusText || 'Client Error'})${detail}.`)
  }
  return new GithubReleasesError(`GitHub returned an unexpected HTTP status (${response.status}).`)
}

const parseNullableString = (value: unknown): string | undefined => {
  if (typeof value === 'string') {
    return value
  }
  if (value === null) {
    return ''
  }
  return undefined
}

const parseRelease = (value: unknown): GithubRelease | undefined => {
  if (
    !value ||
    !hasProperty(value, 'body') ||
    !hasProperty(value, 'html_url') ||
    !hasProperty(value, 'name') ||
    !hasProperty(value, 'published_at') ||
    !hasProperty(value, 'tag_name')
  ) {
    return undefined
  }
  const body = parseNullableString(value.body)
  const name = parseNullableString(value.name)
  const publishedAt = parseNullableString(value.published_at)
  if (
    body === undefined ||
    name === undefined ||
    publishedAt === undefined ||
    typeof value.html_url !== 'string' ||
    typeof value.tag_name !== 'string'
  ) {
    return undefined
  }
  try {
    const htmlUrl = new URL(value.html_url)
    if (htmlUrl.protocol !== 'https:' || htmlUrl.hostname !== 'github.com') {
      return undefined
    }
  } catch {
    return undefined
  }
  return { body, htmlUrl: value.html_url, name, publishedAt, tagName: value.tag_name }
}

const parsePage = async (response: Response): Promise<readonly GithubRelease[]> => {
  let value: unknown
  try {
    value = await response.json()
  } catch {
    throw new GithubReleasesError('GitHub returned an invalid response instead of JSON release data. Please try again later.')
  }
  if (!Array.isArray(value)) {
    throw new GithubReleasesError('GitHub returned invalid release data. Please try again later.')
  }
  const releases = value.map(parseRelease)
  if (releases.some((release) => !release)) {
    throw new GithubReleasesError('GitHub returned invalid release data. Please try again later.')
  }
  return releases as readonly GithubRelease[]
}

export const loadGithubReleases = async ({ owner, repository }: GithubRepository): Promise<GithubReleasesResult> => {
  const releases: GithubRelease[] = []
  for (let page = 1; ; page++) {
    const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/releases?per_page=${pageSize}&page=${page}`
    let response: Response
    try {
      response = await GithubApiRequest.request(url)
    } catch {
      throw new GithubReleasesError('GitHub releases could not be loaded because GitHub is not reachable. Check your connection and try again.')
    }
    if (!response.ok) {
      throw await getHttpError(response)
    }
    const pageReleases = await parsePage(response)
    const remaining = maximumReleases - releases.length
    if (pageReleases.length > remaining) {
      releases.push(...pageReleases.slice(0, remaining))
      return { isTruncated: true, releases }
    }
    releases.push(...pageReleases)
    if (pageReleases.length < pageSize) {
      return { isTruncated: false, releases }
    }
  }
}
