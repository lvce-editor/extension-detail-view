import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-icon-theme'

export const test: Test = async ({ Main, Locator, expect, Extension }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-detail-icon-theme')
  await Extension.addWebExtension(extensionUri)
  await Main.openUri('extension-detail://test.icon-theme-test')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')

  // act
  await tabFeatures.click()

  // assert
  const content = Locator('.FeatureTheme')
  await expect(content).toBeVisible()
  const heading = content.locator('h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Themes')
  const listItems = content.locator('li')
  await expect(listItems).toHaveCount(1)
  const listItem1 = listItems.nth(0)
  await expect(listItem1).toHaveText('Test')
}
