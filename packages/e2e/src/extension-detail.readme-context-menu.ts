import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = 1

export const test: Test = async ({ Command, Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-context-menu')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-readme-context-menu')
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const markDown = Locator('.Markdown')
  await expect(markDown).toBeVisible()

  // act
  await Command.execute('ExtensionDetail.handleReadmeContextMenu', 0, 0, 'a', 'https://example.com')

  // assert
  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()
  const menuItems = menu.locator('.MenuItem')
  await expect(menuItems).toHaveCount(1)
  const first = menuItems.nth(0)
  await expect(first).toHaveText('Copy')
}
