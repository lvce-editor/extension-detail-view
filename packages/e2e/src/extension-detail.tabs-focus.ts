import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.tabs-focus'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  const tabDetails = Locator('.ExtensionDetailTab[name="Details"]')
  await expect(tabDetails).toBeVisible()
  await expect(tabDetails).toHaveAttribute('aria-selected', 'true')

  // act
  await ExtensionDetail.handleTabFocus('Details')

  // assert
  await expect(tabDetails).toBeFocused()

  // TODO also add e2e tests for focusnextTab and focusPreviousTab
}
