import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  // act
  await openGithubChangelog(api, { message: 'connection refused', type: 'network-error' })

  // assert
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub is not reachable. Check your connection and try again.')
}
