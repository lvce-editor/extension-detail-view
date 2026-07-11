import { afterEach, expect, test } from '@jest/globals'
import * as GithubApiRequest from '../src/parts/GithubApiRequest/GithubApiRequest.ts'
import { loadGithubReleases } from '../src/parts/LoadGithubReleases/LoadGithubReleases.ts'

const repository = { owner: 'test-owner', repository: 'test-repository' }
const release = {
  body: 'Release notes',
  html_url: 'https://github.com/test-owner/test-repository/releases/tag/v1',
  name: 'Version 1',
  published_at: '2026-01-01T00:00:00Z',
  tag_name: 'v1',
}

afterEach(() => {
  GithubApiRequest.resetGithubApiMock()
})

test('loads and normalizes releases', async () => {
  GithubApiRequest.mockGithubApi({ body: [release], type: 'success' })
  await expect(loadGithubReleases(repository)).resolves.toEqual([
    { body: 'Release notes', htmlUrl: release.html_url, name: 'Version 1', publishedAt: '2026-01-01T00:00:00Z', tagName: 'v1' },
  ])
})

test('accepts nullable GitHub fields', async () => {
  GithubApiRequest.mockGithubApi({ body: [{ ...release, body: null, name: null, published_at: null }], type: 'success' })
  await expect(loadGithubReleases(repository)).resolves.toEqual([{ body: '', htmlUrl: release.html_url, name: '', publishedAt: '', tagName: 'v1' }])
})

test('loads all paginated releases', async () => {
  GithubApiRequest.mockGithubApi({ releaseCount: 101, type: 'generated' })
  await expect(loadGithubReleases(repository)).resolves.toHaveLength(101)
})

test('reports a network error', async () => {
  GithubApiRequest.mockGithubApi({ type: 'network-error' })
  await expect(loadGithubReleases(repository)).rejects.toThrow('GitHub is not reachable')
})

test('reports invalid JSON', async () => {
  GithubApiRequest.mockGithubApi({ type: 'invalid-json' })
  await expect(loadGithubReleases(repository)).rejects.toThrow('invalid response instead of JSON')
})

test.each([
  {},
  [null],
  [{ ...release, body: 1 }],
  [{ ...release, html_url: 'https://example.com/release' }],
  [{ ...release, html_url: 'not a url' }],
  [{ ...release, name: 1 }],
  [{ ...release, published_at: 1 }],
  [{ ...release, tag_name: 1 }],
])('reports invalid release data: %p', async (body) => {
  GithubApiRequest.mockGithubApi({ body, type: 'success' })
  await expect(loadGithubReleases(repository)).rejects.toThrow('invalid release data')
})

test('reports rate limiting with no reset time', async () => {
  GithubApiRequest.mockGithubApi({
    body: { message: 'API rate limit exceeded' },
    headers: { 'x-ratelimit-remaining': '0' },
    status: 403,
    type: 'response',
  })
  await expect(loadGithubReleases(repository)).rejects.toThrow('GitHub API rate limit exceeded. Please try again later.')
})

test('reports rate limiting with a reset time', async () => {
  GithubApiRequest.mockGithubApi({
    body: { message: 'rate limit exceeded' },
    headers: { 'x-ratelimit-reset': '1893456000' },
    status: 403,
    type: 'response',
  })
  await expect(loadGithubReleases(repository)).rejects.toThrow('GitHub API rate limit exceeded. Try again after')
})

test('reports HTTP 429 as rate limiting', async () => {
  GithubApiRequest.mockGithubApi({ status: 429, type: 'response' })
  await expect(loadGithubReleases(repository)).rejects.toThrow('GitHub API rate limit exceeded')
})

test('reports an unreachable repository', async () => {
  GithubApiRequest.mockGithubApi({ body: { message: 'Not Found' }, status: 404, type: 'response' })
  await expect(loadGithubReleases(repository)).rejects.toThrow('not publicly reachable')
})

test('reports a server error', async () => {
  GithubApiRequest.mockGithubApi({ status: 503, type: 'response' })
  await expect(loadGithubReleases(repository)).rejects.toThrow('server error 503')
})

test('reports a client error with the API message', async () => {
  GithubApiRequest.mockGithubApi({ body: { message: 'Bad request' }, status: 400, type: 'response' })
  await expect(loadGithubReleases(repository)).rejects.toThrow('400 Bad Request): Bad request')
})

test('reports a client error with an invalid error body', async () => {
  GithubApiRequest.mockGithubApi({ body: undefined, status: 401, type: 'response' })
  await expect(loadGithubReleases(repository)).rejects.toThrow('401 Unauthorized')
})

test('reports a client error with non-JSON error body', async () => {
  GithubApiRequest.mockGithubApi({ status: 400, type: 'invalid-json' })
  await expect(loadGithubReleases(repository)).rejects.toThrow('400 Bad Request')
})

test('reports an unexpected HTTP status', async () => {
  GithubApiRequest.mockGithubApi({ status: 302, type: 'response' })
  await expect(loadGithubReleases(repository)).rejects.toThrow('unexpected HTTP status (302)')
})
