import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  // act
  await openGithubChangelog(
    api,
    { body: [createRelease()], type: 'success' },
    'extension-github-releases-object',
    'test.extension-github-releases-object',
  )

  // assert
  await api.expect(api.Locator('.Changelog')).toContainText('Version 1.0.0')
}
