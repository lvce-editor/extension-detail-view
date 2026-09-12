import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  // act
  await openGithubChangelog(api, { body: { message: 'not an array' }, type: 'success' })

  // assert
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub returned invalid release data.')
}
