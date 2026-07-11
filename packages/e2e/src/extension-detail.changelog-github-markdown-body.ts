import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: [createRelease({ body: '[Important details](https://example.com)' })], type: 'success' })
  const bodyLink = api.Locator('.Changelog a').nth(1)
  await api.expect(bodyLink).toHaveText('Important details')
  await api.expect(bodyLink).toHaveAttribute('href', 'https://example.com')
}
