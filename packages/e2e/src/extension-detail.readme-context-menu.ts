import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ ClipBoard, ContextMenu, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-context-menu')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-readme-context-menu')
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const markDown = Locator('.Markdown')
  await expect(markDown).toBeVisible()

  // act
  const paragraph = markDown.locator('p').first()
  await paragraph.selectText()
  await paragraph.click({ button: 'right' })

  // assert
  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()
  const menuItems = menu.locator('.MenuItem')
  await expect(menuItems).toHaveCount(3)
  const cut = menuItems.nth(0)
  const copy = menuItems.nth(1)
  const paste = menuItems.nth(2)
  await expect(cut).toHaveText('Cut')
  await expect(cut).toHaveAttribute('aria-disabled', 'true')
  await expect(copy).toHaveText('Copy')
  await expect(copy).toHaveAttribute('aria-disabled', null)
  await expect(paste).toHaveText('Paste')
  await expect(paste).toHaveAttribute('aria-disabled', 'true')

  // act
  await ContextMenu.selectItem('Copy')

  // assert
  await ClipBoard.shouldHaveText('test readme')
}
