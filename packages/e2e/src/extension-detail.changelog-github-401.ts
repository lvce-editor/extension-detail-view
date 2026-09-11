import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  // act
  await openGithubChangelog(api, { body: { message: 'Requires authentication' }, status: 401, type: 'response' })

  // assert
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub rejected the releases request (401 Unauthorized): Requires authentication.')
}
