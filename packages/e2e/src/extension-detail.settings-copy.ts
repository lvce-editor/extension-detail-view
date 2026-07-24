import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ ClipBoard, Command, ContextMenu, Extension, ExtensionDetail }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-settings-menu')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-settings-menu')
  await Command.execute('ExtensionDetail.handleClickSettings', 100, 200)

  // act
  await ContextMenu.selectItem('Copy')

  // assert
  await ClipBoard.shouldHaveText(
    [
      'Name: Settings Menu Extension',
      'Id: test.extension-settings-menu',
      'Description: An extension used to test the settings menu',
      'Version: 1.2.3',
      'Publisher: Test Publisher',
    ].join('\n'),
  )
}
