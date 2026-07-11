import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: { message: 'Bad request' }, status: 400, type: 'response' })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub rejected the releases request (400 Bad Request): Bad request.')
}
