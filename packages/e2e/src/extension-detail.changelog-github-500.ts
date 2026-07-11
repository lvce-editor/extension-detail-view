import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: { message: 'Internal Server Error' }, status: 500, type: 'response' })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub is temporarily unavailable (server error 500).')
}
