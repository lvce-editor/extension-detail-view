import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    body: [api.ExtensionDetail.createGithubRelease()],
    type: 'success',
  })
  const link = api.Locator('.Changelog h1 a')
  await api.expect(link).toHaveAttribute('href', 'https://github.com/test-owner/test-repository/releases/tag/v1.0.0')
  await api.expect(link).toHaveAttribute('target', '_blank')
}
