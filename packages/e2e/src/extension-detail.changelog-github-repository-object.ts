import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async (api) => {
  await api.ExtensionDetail.openGithubChangelog(
    import.meta.resolve('../fixtures/extension-github-releases-object'),
    'test.extension-github-releases-object',
    { body: [api.ExtensionDetail.createGithubRelease()], type: 'success' },
  )
  await api.expect(api.Locator('.Changelog')).toContainText('Version 1.0.0')
}
