import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: [createRelease()], type: 'success' })
  await api.expect(api.Locator('.Changelog')).toContainText('Version 1.0.0')
  await api.expect(api.Locator('.Changelog')).toContainText('Fixed an important bug.')
}
