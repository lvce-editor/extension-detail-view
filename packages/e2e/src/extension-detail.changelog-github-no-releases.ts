import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    body: [],
    type: 'success',
  })
  await api.expect(api.Locator('.Changelog')).toContainText('No GitHub releases were found for test-owner/test-repository.')
}
