import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  const issueUrl = 'https://github.com/lvce-editor/eslint/pull/82'
  await openGithubChangelog(api, { body: [createRelease({ body: `Fixed an important bug in ${issueUrl}` })], type: 'success' })
  const issueLink = api.Locator(`.Changelog a[href="${issueUrl}"]`)
  await api.expect(issueLink).toHaveText('#82')
  await api.expect(issueLink).toHaveAttribute('href', issueUrl)
}
