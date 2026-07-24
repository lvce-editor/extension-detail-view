import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    body: { message: 'Service Unavailable' },
    status: 503,
    type: 'response',
  })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub is temporarily unavailable (server error 503).')
}
