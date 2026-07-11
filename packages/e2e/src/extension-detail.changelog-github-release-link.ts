import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './GithubReleaseTest/GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: [createRelease()], type: 'success' })
  const link = api.Locator('.Changelog h1 a')
  await api.expect(link).toHaveAttribute('href', 'https://github.com/test-owner/test-repository/releases/tag/v1.0.0')
  await api.expect(link).toHaveAttribute('target', '_blank')
}
