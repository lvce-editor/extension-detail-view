import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  // act
  await openGithubChangelog(api, { body: [createRelease({ name: null, tag_name: 'v2.0.0' })], type: 'success' })

  // assert
  await api.expect(api.Locator('.Changelog h1')).toContainText('v2.0.0')
}
