import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './GithubReleaseTest/GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: { message: 'Service Unavailable' }, status: 503, type: 'response' })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub is temporarily unavailable (server error 503).')
}
