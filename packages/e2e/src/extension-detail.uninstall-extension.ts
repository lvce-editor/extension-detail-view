import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.uninstall-extension'

export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator, Main }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-disable')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-enable-error')

  // act
  await ExtensionDetail.handleClickUninstall()

  // assert
  const disableButton = Locator('.ExtensionDetail [name="Disable"]')
  await expect(disableButton).toBeHidden()
  const enableButton = Locator('.ExtensionDetail [name="Enable"]')
  await expect(enableButton).toBeHidden()
  const uninstallButton = Locator('.ExtensionDetail [name="Uninstall"]')
  await expect(uninstallButton).toBeHidden()

  await Main.closeActiveEditor()
  await ExtensionDetail.open('test.extension-enable-error')
  const errorTitle = Locator('.ExtensionDetailErrorTitle')
  const errorMessage = Locator('.ExtensionDetailErrorMessage')
  await expect(errorTitle).toHaveText('Unable to load extension')
  await expect(errorMessage).toHaveText('The extension "test.extension-enable-error" is not available in this version of LVCE Editor.')
}
