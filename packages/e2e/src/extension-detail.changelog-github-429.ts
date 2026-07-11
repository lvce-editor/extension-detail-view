import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './GithubReleaseTest/GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { status: 429, type: 'response' })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub API rate limit exceeded. Please try again later.')
}
