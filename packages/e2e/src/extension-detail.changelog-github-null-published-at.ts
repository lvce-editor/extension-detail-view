import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: [createRelease({ published_at: null })], type: 'success' })
  await api.expect(api.Locator('.Changelog')).toContainText('Publication date unavailable')
}
