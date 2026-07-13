import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: [createRelease({ html_url: 'javascript:alert(1)' })], type: 'success' })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub returned invalid release data.')
}
