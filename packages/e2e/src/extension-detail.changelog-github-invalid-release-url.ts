import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  // act
  await openGithubChangelog(api, { body: [createRelease({ html_url: 'javascript:alert(1)' })], type: 'success' })

  // assert
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub returned invalid release data.')
}
