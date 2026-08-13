import type { Test } from '@lvce-editor/test-with-playwright'
import { createRelease, openGithubChangelog } from './_GithubReleaseTest.js'

export const test: Test = async (api) => {
  const downloadUrl = 'https://github.com/test-owner/test-repository/releases/download/v1.0.0/extension-v1.0.0.tar.br'
  const asset = {
    browser_download_url: downloadUrl,
    download_count: 12,
    name: 'extension-v1.0.0.tar.br',
    size: 535_000,
  }
  await openGithubChangelog(api, { body: [createRelease({ assets: [asset] })], type: 'success' })
  await api.expect(api.Locator('.Changelog')).toContainText('Assets (1)')
  await api.expect(api.Locator('.Changelog')).toContainText('535 kB · 12 downloads')
  const assetLink = api.Locator('.Changelog a').nth(1)
  await api.expect(assetLink).toHaveText('extension-v1.0.0.tar.br')
  await api.expect(assetLink).toHaveAttribute('href', downloadUrl)
  await api.expect(assetLink).toHaveAttribute('target', '_blank')
}
