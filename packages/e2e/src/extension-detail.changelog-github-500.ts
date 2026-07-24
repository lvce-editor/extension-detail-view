import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    body: { message: 'Internal Server Error' },
    status: 500,
    type: 'response',
  })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub is temporarily unavailable (server error 500).')
}
