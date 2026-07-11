import type { Test } from '@lvce-editor/test-with-playwright'
import { openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  await openGithubChangelog(api, { body: { message: 'Not Found' }, status: 404, type: 'response' })
  await api.expect(api.Locator('.Changelog')).toContainText('The GitHub repository could not be found or is not publicly reachable.')
}
