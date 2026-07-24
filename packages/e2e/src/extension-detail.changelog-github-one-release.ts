import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    body: [api.ExtensionDetail.createGithubRelease({ published_at: twoDaysAgo })],
    type: 'success',
  })
  await api.expect(api.Locator('.Changelog')).toContainText('Version 1.0.0')
  await api.expect(api.Locator('.Changelog')).toContainText('Published 2 days ago')
  await api.expect(api.Locator('.Changelog')).toContainText('Fixed an important bug.')
}
