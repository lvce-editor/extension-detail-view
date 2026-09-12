import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ ClipBoard, Command, ContextMenu, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-changelog')
  await ExtensionDetail.selectChangelog()

  // assert
  const link = Locator('.Changelog a').first()
  await expect(link).toBeVisible()

  // act
  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, 'https://example.com')

  // assert
  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(4)
  const copyLink = menuItems.nth(3)
  await expect(copyLink).toHaveText('Copy Link')

  // act
  await ContextMenu.selectItem('Copy Link')

  // assert
  await ClipBoard.shouldHaveText('https://example.com')
}
