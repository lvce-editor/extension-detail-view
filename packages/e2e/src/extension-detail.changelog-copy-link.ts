import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ ClipBoard, Command, ContextMenu, expect, Extension, ExtensionDetail, Locator }) => {
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-changelog')
  await ExtensionDetail.selectChangelog()
  const link = Locator('.Changelog a')
  await expect(link).toBeVisible()

  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, 'https://example.com')

  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(4)
  const copyLink = menuItems.nth(3)
  await expect(copyLink).toHaveText('Copy Link')
  await ContextMenu.selectItem('Copy Link')
  await ClipBoard.shouldHaveText('https://example.com')
}
