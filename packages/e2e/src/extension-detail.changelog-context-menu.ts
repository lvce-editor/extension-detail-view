import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-changelog')
  await ExtensionDetail.selectChangelog()
  const changelog = Locator('.Changelog')
  await expect(changelog).toBeVisible()

  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, '')

  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(3)
  const cut = menuItems.nth(0)
  const copy = menuItems.nth(1)
  const paste = menuItems.nth(2)
  await expect(cut).toHaveText('Cut')
  await expect(cut).toHaveAttribute('aria-disabled', 'true')
  await expect(copy).toHaveText('Copy')
  await expect(paste).toHaveText('Paste')
  await expect(paste).toHaveAttribute('aria-disabled', 'true')
}
