import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.uninstall-extension'

export const skip = 1

export const test: Test = async ({ Command, Extension, ExtensionDetail, Locator, expect }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-disable')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-enable-error')

  // act
  await Command.execute('ExtensionDetail.handleClickUninstall')

  // assert
  const disableButton = Locator('.ExtensionDetail [name="Disable"]')
  await expect(disableButton).toBeHidden()
  const enableButton = Locator('.ExtensionDetail [name="Enable"]')
  await expect(enableButton).toBeVisible()
}
