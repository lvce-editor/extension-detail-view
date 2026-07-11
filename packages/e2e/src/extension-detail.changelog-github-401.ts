import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './GithubReleaseTest/GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: { message: 'Requires authentication' }, status: 401, type: 'response' })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub rejected the releases request (401 Unauthorized): Requires authentication.')
}
