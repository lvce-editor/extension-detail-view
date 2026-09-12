import { expect, test } from '@jest/globals'
import { GithubReleasesError } from '../src/parts/GithubReleasesError/GithubReleasesError.ts'

test('GithubReleasesError preserves the message and identifies the error', () => {
  const error = new GithubReleasesError('Failed to fetch releases')

  expect(error).toBeInstanceOf(Error)
  expect(error.message).toBe('Failed to fetch releases')
  expect(error.name).toBe('GithubReleasesError')
  expect(error.code).toBe('E_GITHUB_RELEASES')
})
