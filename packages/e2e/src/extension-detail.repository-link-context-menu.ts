import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ ClipBoard, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-repository-link')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-repository-link')
  const detailView = Locator('.ExtensionDetail')
  const resourcesSection = detailView.locator('.AdditionalDetailsEntry').nth(3)
  await expect(resourcesSection).toBeVisible()

  // act
  await ExtensionDetail.handleReadmeContextMenu(0, 0, 'a', 'https://example.com')

  // assert
  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()
  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(2)
  const menuItem1 = menuItems.nth(0)
  await expect(menuItem1).toHaveText('Copy Link')
  const menuItem2 = menuItems.nth(1)
  await expect(menuItem2).toHaveText(`Copy`)
}
