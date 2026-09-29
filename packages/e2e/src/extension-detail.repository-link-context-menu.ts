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
  await expect(menuItems).toHaveCount(4)
  const cut = menuItems.nth(0)
  const copy = menuItems.nth(1)
  const paste = menuItems.nth(2)
  const copyLink = menuItems.nth(3)
  await expect(cut).toHaveText('Cut')
  await expect(cut).toHaveAttribute('aria-disabled', 'true')
  await expect(copy).toHaveText('Copy')
  await expect(copy).toHaveAttribute('aria-disabled', null)
  await expect(paste).toHaveText('Paste')
  await expect(paste).toHaveAttribute('aria-disabled', 'true')
  await expect(copyLink).toHaveText('Copy Link')
}
