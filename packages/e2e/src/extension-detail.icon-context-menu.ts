import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-repository-link')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-repository-link')

  // act
  await Command.execute('ExtensionDetail.handleImageContextMenu', 0, 0)

  // assert
  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()
  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(2)
  const menuItem1 = menuItems.nth(0)
  await expect(menuItem1).toHaveText('Copy Image')
  const menuItem2 = menuItems.nth(1)
  await expect(menuItem2).toHaveText(`Copy Image Url`)
}
