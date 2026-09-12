import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  // act
  await openGithubChangelog(api, { body: { message: 'Internal Server Error' }, status: 500, type: 'response' })

  // assert
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub is temporarily unavailable (server error 500).')
}
