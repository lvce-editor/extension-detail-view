import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    body: { message: 'not an array' },
    type: 'success',
  })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub returned invalid release data.')
}
