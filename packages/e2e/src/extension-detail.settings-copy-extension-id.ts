import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ ClipBoard, Command, ContextMenu, Extension, ExtensionDetail }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-settings-menu')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-settings-menu')
  await Command.execute('ExtensionDetail.handleClickSettings', 100, 200)

  // act
  await ContextMenu.selectItem('Copy Extension ID')

  // assert
  await ClipBoard.shouldHaveText('test.extension-settings-menu')
}
