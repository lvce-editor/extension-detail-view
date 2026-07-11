import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './GithubReleaseTest/GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: [{ name: 'Incomplete release' }], type: 'success' })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub returned invalid release data.')
}
