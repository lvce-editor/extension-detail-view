import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.set-color-theme-disabled'

export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-detail-theme')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.theme-test')
  await ExtensionDetail.selectFeatures()
  const setColorThemeButton = Locator('.Button[name="SetColorTheme"]')
  await expect(setColorThemeButton).toBeVisible()

  // act - disable extension
  await ExtensionDetail.handleClickDisable()

  // assert - set color theme button should be hidden
  await expect(setColorThemeButton).toBeHidden()

  // act - enable extension
  await ExtensionDetail.handleClickEnable()

  // assert - set color theme button should be visible again
  await expect(setColorThemeButton).toBeVisible()
}
