import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './GithubReleaseTest/GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(
    api,
    { body: [createRelease()], type: 'success' },
    'extension-github-releases-object',
    'test.extension-github-releases-object',
  )
  await api.expect(api.Locator('.Changelog')).toContainText('Version 1.0.0')
}
