import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { releaseCount: 101, type: 'generated' })
  await api.expect(api.Locator('.Changelog h1')).toHaveCount(100)
  await api.expect(api.Locator('.Changelog')).toContainText('Older releases are not displayed')
}
