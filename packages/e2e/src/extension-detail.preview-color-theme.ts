import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.preview-color-theme'

export const skip = 1

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const slimeExtensionUri = import.meta.resolve('../fixtures/extension-detail-slime-theme')
  const extensionUri = import.meta.resolve('../fixtures/extension-detail-theme')
  await Extension.addWebExtension(slimeExtensionUri)
  await Extension.addWebExtension(extensionUri)
  await Command.execute('ColorTheme.setColorTheme', 'slime-theme')
  await ExtensionDetail.open('test.theme-test')
  await ExtensionDetail.handleClickDisable()
  const enableButton = Locator('.ExtensionDetail [name="Enable"]')
  await expect(enableButton).toBeVisible()
  const activityBar = Locator('.ActivityBar')
  await expect(activityBar).toHaveCSS('background-color', 'rgb(132, 204, 22)')

  // act
  await enableButton.hover()

  // assert
  await expect(activityBar).toHaveCSS('background-color', 'rgb(255, 165, 0)')

  // act
  await Locator('.ExtensionDetail').hover()

  // assert
  await expect(activityBar).toHaveCSS('background-color', 'rgb(132, 204, 22)')
}
