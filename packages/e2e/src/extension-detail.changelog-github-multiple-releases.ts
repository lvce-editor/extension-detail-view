import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    body: [api.ExtensionDetail.createGithubRelease(), api.ExtensionDetail.createGithubRelease({ name: 'Version 0.9.0', tag_name: 'v0.9.0' })],
    type: 'success',
  })
  await api.expect(api.Locator('.Changelog h1')).toHaveCount(2)
}
