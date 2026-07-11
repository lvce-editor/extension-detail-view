import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './GithubReleaseTest/GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: [createRelease({ published_at: 'not-a-date' })], type: 'success' })
  await api.expect(api.Locator('.Changelog')).toContainText('Publication date unavailable')
}
