import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  // act
  await openGithubChangelog(api, { type: 'invalid-json' })

  // assert
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub returned an invalid response instead of JSON release data.')
}
