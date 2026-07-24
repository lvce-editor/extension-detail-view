import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    releaseCount: 5000,
    type: 'generated',
  })
  await api.expect(api.Locator('.Changelog h1')).toHaveCount(100)
  await api.expect(api.Locator('.Changelog')).toContainText('Showing the newest 100 GitHub releases')
  await api.expect(api.Locator('.Changelog')).toContainText('Version 5000')
  await api.expect(api.Locator('.Changelog')).toContainText('Version 4901')
}
