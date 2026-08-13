import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: [createRelease(), createRelease({ name: 'Version 0.9.0', tag_name: 'v0.9.0' })], type: 'success' })
  const releaseHeadings = api.Locator('.Changelog .Markdown > h1')
  await api.expect(releaseHeadings).toHaveCount(2)
  await api.expect(releaseHeadings.nth(1)).toBeVisible()
}
