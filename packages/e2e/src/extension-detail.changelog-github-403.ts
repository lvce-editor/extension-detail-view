import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './GithubReleaseTest/GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: { message: 'Access forbidden' }, status: 403, type: 'response' })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub rejected the releases request (403 Forbidden): Access forbidden.')
}
