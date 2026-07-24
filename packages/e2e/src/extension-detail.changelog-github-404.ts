import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    body: { message: 'Not Found' },
    status: 404,
    type: 'response',
  })
  await api.expect(api.Locator('.Changelog')).toContainText('The GitHub repository could not be found or is not publicly reachable.')
}
