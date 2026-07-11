import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { releaseCount: 5000, type: 'generated' })
  await api.expect(api.Locator('.Changelog h1')).toHaveCount(5000)
  await api.expect(api.Locator('.Changelog')).toContainText('Version 5000')
  await api.expect(api.Locator('.Changelog')).toContainText('Version 1')
}
