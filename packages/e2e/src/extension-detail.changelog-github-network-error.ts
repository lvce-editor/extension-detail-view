import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './GithubReleaseTest/GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { message: 'connection refused', type: 'network-error' })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub is not reachable. Check your connection and try again.')
}
