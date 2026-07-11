import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './GithubReleaseTest/GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: [], type: 'success' })
  await api.expect(api.Locator('.Changelog')).toContainText('No GitHub releases were found for test-owner/test-repository.')
}
