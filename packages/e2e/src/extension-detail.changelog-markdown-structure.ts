import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.changelog-markdown-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-changelog')

  await ExtensionDetail.selectChangelog()

  const changelog = Locator('.ExtensionDetailPanel.Changelog')
  await expect(changelog.locator('h1')).toHaveText('Changes')
  const changes = changelog.locator('li')
  const first = changes.nth(0)
  const second = changes.nth(1)
  await expect(changes).toHaveCount(2)
  await expect(first).toHaveText('Change 1')
  await expect(second).toHaveText('Change 2')
}
