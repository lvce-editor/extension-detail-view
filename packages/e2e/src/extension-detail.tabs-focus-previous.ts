import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.tabs-focus-previous'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')
  const tabDetails = Locator('.ExtensionDetailTab[name="Details"]')
  await expect(tabDetails).toBeVisible()
  await expect(tabDetails).toHaveAttribute('aria-selected', 'true')
  await ExtensionDetail.handleTabFocus('Features')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')
  await expect(tabFeatures).toBeFocused()

  // act
  await ExtensionDetail.focusPreviousTab()

  // assert
  await expect(tabDetails).toBeFocused()
}
