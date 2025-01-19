import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.features'

export const test: Test = async ({ Main, Locator, expect, Extension }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-detail-theme')
  await Extension.addWebExtension(extensionUri)
  console.log({ extensionUri })
  // arrange
  await Main.openUri('extension-detail://ayu')
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
  await expect(listItem1).toHaveText('Ayu')
}
