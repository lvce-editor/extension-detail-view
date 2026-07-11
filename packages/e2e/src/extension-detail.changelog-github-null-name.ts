import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './GithubReleaseTest/GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: [createRelease({ name: null, tag_name: 'v2.0.0' })], type: 'success' })
  await api.expect(api.Locator('.Changelog h1')).toContainText('v2.0.0')
}
