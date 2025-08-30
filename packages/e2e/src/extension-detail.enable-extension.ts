import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.enable-extension'

export const skip = 1

export const test: Test = async ({ Command, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-enable-error')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-enable-error')
  await Command.execute('ExtensionDetail.handleClickDisable')

  // act
  await Command.execute('ExtensionDetail.handleClickEnable')

  // assert
}
