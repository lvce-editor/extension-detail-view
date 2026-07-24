import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    releaseCount: 101,
    type: 'generated',
  })
  await api.expect(api.Locator('.Changelog h1')).toHaveCount(100)
  await api.expect(api.Locator('.Changelog')).toContainText('Older releases are not displayed')
}
