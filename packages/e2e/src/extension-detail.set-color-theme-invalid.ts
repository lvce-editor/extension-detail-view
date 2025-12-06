import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.set-color-theme-invalid'

export const skip = 1

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-detail-theme-invalid')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.theme-test')
  await ExtensionDetail.selectFeatures()
  const setColorThemeButton = Locator('.Button[name="SetColorTheme"]')
  await expect(setColorThemeButton).toBeVisible()

  // act
  await Command.execute('ExtensionDetail.handleClickSetColorTheme')

  // assert

  // TODO mock alert dialog
  // TODO verify that error dialog has been shown
}
