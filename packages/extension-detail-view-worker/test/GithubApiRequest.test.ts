import { afterEach, expect, jest, test } from '@jest/globals'
import * as GithubApiRequest from '../src/parts/GithubApiRequest/GithubApiRequest.ts'

const originalFetch = globalThis.fetch

afterEach(() => {
  GithubApiRequest.resetGithubApiMock()
  globalThis.fetch = originalFetch
})

test('requests GitHub with the recommended API headers', async () => {
  const response = new Response('[]')
  const mockFetch = jest.fn<typeof fetch>().mockResolvedValue(response)
  globalThis.fetch = mockFetch
  await expect(GithubApiRequest.request('https://api.github.com/repos/owner/repository/releases')).resolves.toBe(response)
  expect(mockFetch).toHaveBeenCalledWith('https://api.github.com/repos/owner/repository/releases', {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
})

test('uses a custom mock network error', async () => {
  GithubApiRequest.mockGithubApi({ message: 'custom error', type: 'network-error' })
  await expect(GithubApiRequest.request('https://api.github.com/test')).rejects.toThrow('custom error')
})
