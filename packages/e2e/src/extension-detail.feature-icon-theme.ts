import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-icon-theme'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-detail-icon-theme')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.icon-theme-test')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('Theme')

  // assert
  const content = Locator('.FeatureContent')
  await expect(content).toBeVisible()
  const heading = content.locator('h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Theme')
  const subHeading = content.locator('h3')
  await expect(subHeading).toHaveText('File Icon Themes')
  const listItems = content.locator('li')
  await expect(listItems).toHaveCount(1)
  const listItem1 = listItems.nth(0)
  await expect(listItem1).toHaveText('Test')
}
