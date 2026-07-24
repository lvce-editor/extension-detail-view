import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.tabs-focus-next'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  const tabDetails = Locator('.ExtensionDetailTab[name="Details"]')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')
  await expect(tabDetails).toBeVisible()
  await expect(tabDetails).toHaveAttribute('aria-selected', 'true')
  await ExtensionDetail.handleTabFocus('Details')

  // act
  await ExtensionDetail.focusNextTab()

  // assert
  await expect(tabFeatures).toBeFocused()

  // TODO also add e2e tests for focusnextTab and focusPreviousTab
}
