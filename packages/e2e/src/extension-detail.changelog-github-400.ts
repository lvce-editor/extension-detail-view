import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    body: { message: 'Bad request' },
    status: 400,
    type: 'response',
  })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub rejected the releases request (400 Bad Request): Bad request.')
}
