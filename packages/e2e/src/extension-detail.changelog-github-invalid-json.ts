import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './GithubReleaseTest/GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { type: 'invalid-json' })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub returned an invalid response instead of JSON release data.')
}
