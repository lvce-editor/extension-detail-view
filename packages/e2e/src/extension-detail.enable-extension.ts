import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.enable-extension'

export const skip = 1

export const test: Test = async ({ Command, Extension, ExtensionDetail, Locator, expect }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-enable-error')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-enable-error')
  await Command.execute('ExtensionDetail.handleClickDisable')

  // act
  await Command.execute('ExtensionDetail.handleClickEnable')

  // assert
  const enableButton = Locator('.ExtensionDetail [name="Enable"]')
  await expect(enableButton).toBeHidden()
  const disableButton = Locator('.ExtensionDetail [name="Disable"]')
  await expect(disableButton).toBeVisible()
}
