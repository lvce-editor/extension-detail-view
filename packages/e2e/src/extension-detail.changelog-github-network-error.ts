import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    message: 'connection refused',
    type: 'network-error',
  })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub is not reachable. Check your connection and try again.')
}
