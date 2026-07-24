import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-settings-menu')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-settings-menu')

  // act
  await Command.execute('ExtensionDetail.handleClickSettings', 100, 200)

  // assert
  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()
  const menuItems = menu.locator('.MenuItem')
  await expect(menuItems).toHaveCount(2)
  const copyItem = menuItems.nth(0)
  await expect(copyItem).toHaveText('Copy')
  const copyExtensionIdItem = menuItems.nth(1)
  await expect(copyExtensionIdItem).toHaveText('Copy Extension ID')
}
