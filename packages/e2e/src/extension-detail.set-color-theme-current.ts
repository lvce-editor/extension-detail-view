import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.set-color-theme-current'

export const skip = 1

export const test: Test = async ({ expect, Command, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-detail-slime-theme')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.slime-theme-test')
  await ExtensionDetail.selectFeatures()
  await Command.execute('ExtensionDetail.handleClickSetColorTheme')

  // assert
  const setColorThemeButton = Locator('.Button[name="SetColorTheme"]')
  await expect(setColorThemeButton).toBeHidden()
}
