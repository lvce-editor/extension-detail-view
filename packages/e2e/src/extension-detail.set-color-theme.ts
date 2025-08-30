import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.set-color-theme'

export const skip = 1

export const test: Test = async ({ Command, Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-detail-theme')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.theme-test')
  await ExtensionDetail.selectFeatures()
  const setColorThemeButton = Locator('.Button[name="SetColorTheme"]')
  await expect(setColorThemeButton).toBeVisible()

  // act
  await Command.execute('ExtensionDetail.handleClickSetColorTheme')

  // assert
  const activityBar = Locator('.ActivityBar')
  await expect(activityBar).toHaveCSS('background-color', 'rgb(255, 165, 0)')
}
