import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  // act
  await openGithubChangelog(api, { body: [createRelease({ published_at: null })], type: 'success' })

  // assert
  await api.expect(api.Locator('.Changelog')).toContainText('Publication date unavailable')
}
