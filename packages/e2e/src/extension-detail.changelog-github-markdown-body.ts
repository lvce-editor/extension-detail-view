import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: [createRelease({ body: '**Important** change' })], type: 'success' })
  await api.expect(api.Locator('.Changelog strong')).toHaveText('Important')
}
