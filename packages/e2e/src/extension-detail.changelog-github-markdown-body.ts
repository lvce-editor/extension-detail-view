import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(import.meta.resolve('../fixtures/extension-github-releases'), 'test.extension-github-releases', {
    body: [api.ExtensionDetail.createGithubRelease({ body: '[Important details](https://example.com)' })],
    type: 'success',
  })
  const bodyLink = api.Locator('.Changelog a').nth(1)
  await api.expect(bodyLink).toHaveText('Important details')
  await api.expect(bodyLink).toHaveAttribute('href', 'https://example.com')
}
