import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  // act
  await openGithubChangelog(api, { status: 429, type: 'response' })

  // assert
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub API rate limit exceeded. Please try again later.')
}
