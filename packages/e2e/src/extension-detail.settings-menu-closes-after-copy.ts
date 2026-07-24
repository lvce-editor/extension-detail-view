import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ ClipBoard, Command, ContextMenu, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-settings-menu')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-settings-menu')
  await Command.execute('ExtensionDetail.handleClickSettings', 100, 200)
  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()

  // act
  await ContextMenu.selectItem('Copy Extension ID')

  // assert
  await expect(menu).toBeHidden()
}
