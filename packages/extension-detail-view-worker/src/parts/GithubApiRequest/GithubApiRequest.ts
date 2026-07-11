import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

export interface GithubApiMock {
  readonly body?: unknown
  readonly headers?: Readonly<Record<string, string>>
  readonly message?: string
  readonly releaseCount?: number
  readonly status?: number
  readonly statusText?: string
  readonly type: 'generated' | 'invalid-json' | 'network-error' | 'response' | 'success'
}

let mock: GithubApiMock | undefined

const getPage = (url: string): number => {
  return Number(new URL(url).searchParams.get('page')) || 1
}

const createGeneratedReleases = (url: string, count: number): readonly unknown[] => {
  const page = getPage(url)
  const start = (page - 1) * 100
  const end = Math.min(start + 100, count)
  return Array.from({ length: Math.max(0, end - start) }, (_, index) => {
    const releaseNumber = count - start - index
    return {
      body: `Release notes for version ${releaseNumber}`,
      html_url: `https://github.com/test-owner/test-repository/releases/tag/v${releaseNumber}`,
      name: `Version ${releaseNumber}`,
      published_at: '2026-01-01T00:00:00Z',
      tag_name: `v${releaseNumber}`,
    }
  })
}

const createMockResponse = (url: string, value: GithubApiMock): Response => {
  const status = value.status ?? 200
  const statusText = value.statusText || getStatusText(status)
  const headers = new Headers(value.headers)
  if (value.type === 'invalid-json') {
    headers.set('content-type', 'text/html')
    return new Response('<!doctype html><title>Unexpected response</title>', { headers, status, statusText })
  }
  const body = value.type === 'generated' ? createGeneratedReleases(url, value.releaseCount ?? 0) : (value.body ?? [])
  headers.set('content-type', 'application/json')
  return Response.json(body, { headers, status, statusText })
}

const getStatusText = (status: number): string => {
  switch (status) {
    case 400:
      return 'Bad Request'
    case 401:
      return 'Unauthorized'
    case 403:
      return 'Forbidden'
    case 404:
      return 'Not Found'
    case 429:
      return 'Too Many Requests'
    case 500:
      return 'Internal Server Error'
    case 503:
      return 'Service Unavailable'
    default:
      return ''
  }
}

export const request = (url: string): Promise<Response> => {
  if (!mock) {
    return fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  }
  if (mock.type === 'network-error') {
    return Promise.reject(new TypeError(mock.message || 'Failed to fetch'))
  }
  return Promise.resolve(createMockResponse(url, mock))
}

export const mockGithubApi = (value: GithubApiMock): void => {
  mock = value
}

export const handleMockGithubApi = (state: ExtensionDetailState, value: GithubApiMock): ExtensionDetailState => {
  mockGithubApi(value)
  return state
}

export const resetGithubApiMock = (): void => {
  mock = undefined
}

export const handleResetGithubApiMock = (state: ExtensionDetailState): ExtensionDetailState => {
  resetGithubApiMock()
  return state
}
