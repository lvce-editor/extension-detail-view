import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    type: 'invalid-json',
  })
  await api.expect(api.Locator('.Changelog')).toContainText('GitHub returned an invalid response instead of JSON release data.')
}
