import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    status: 429,
    type: 'response',
  })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub API rate limit exceeded. Please try again later.')
}
