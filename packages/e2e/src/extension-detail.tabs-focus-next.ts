import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.tabs-focus-next'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  const tabDetails = Locator('.ExtensionDetailTab[name="Details"]')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')
  const tabSecurity = Locator('.ExtensionDetailTab[name="Security"]')
  const tabChangelog = Locator('.ExtensionDetailTab[name="Changelog"]')
  await expect(tabDetails).toBeVisible()
  await expect(tabDetails).toHaveAttribute('aria-selected', 'true')
  await ExtensionDetail.handleTabFocus('Details')

  // act
  await ExtensionDetail.focusNextTab()

  // assert
  await expect(tabFeatures).toBeFocused()

  // act
  await ExtensionDetail.focusNextTab()

  // assert
  await expect(tabSecurity).toBeFocused()

  // act
  await ExtensionDetail.focusNextTab()

  // assert
  await expect(tabChangelog).toBeFocused()
}
