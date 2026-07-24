import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    body: [api.ExtensionDetail.createGithubRelease({ published_at: 'not-a-date' })],
    type: 'success',
  })
  await api.expect(api.Locator('.Changelog')).toContainText('Publication date unavailable')
}
