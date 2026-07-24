import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.changelog-panel-role'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-changelog')

  await ExtensionDetail.selectChangelog()

  const changelog = Locator('.ExtensionDetailPanel.Changelog')
  await expect(changelog).toBeVisible()
  await expect(changelog).toHaveAttribute('role', 'panel')
}
