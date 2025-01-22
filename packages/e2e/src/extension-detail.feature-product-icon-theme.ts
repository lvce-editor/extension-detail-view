import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-product-icon-theme'

export const test: Test = async ({ Main, Locator, expect, Extension }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-detail-product-icon-theme')
  await Extension.addWebExtension(extensionUri)
  await Main.openUri('extension-detail://test.product-icon-theme-test')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')
  await tabFeatures.click()
  const featureTheme = Locator('.Feature[name="Theme"]')

  // act
  await featureTheme.click()

  // assert
  const content = Locator('.FeatureTheme')
  await expect(content).toBeVisible()
  const heading = content.locator('h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Theme')
  const subHeading = content.locator('h3')
  await expect(subHeading).toHaveText('Product Icon Themes')
  const listItems = content.locator('li')
  await expect(listItems).toHaveCount(1)
  const listItem1 = listItems.nth(0)
  await expect(listItem1).toHaveText('Test')
}
