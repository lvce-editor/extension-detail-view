import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './GithubReleaseTest/GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, {
    body: { message: 'API rate limit exceeded' },
    headers: { 'x-ratelimit-remaining': '0' },
    status: 403,
    type: 'response',
  })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub API rate limit exceeded. Please try again later.')
}
