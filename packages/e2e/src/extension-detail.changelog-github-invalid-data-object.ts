import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: { message: 'not an array' }, type: 'success' })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub returned invalid release data.')
}
