import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    body: [api.ExtensionDetail.createGithubRelease({ name: null, tag_name: 'v2.0.0' })],
    type: 'success',
  })
  await api.expect(api.Locator('.Changelog h1')).toContainText('v2.0.0')
}
