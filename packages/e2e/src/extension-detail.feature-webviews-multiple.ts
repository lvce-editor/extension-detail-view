import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-webviews-multiple'

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-webviews-multiple')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.webviews-test')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('WebViews')

  // assert
  const features = Locator('.FeatureWebView')
  await expect(features).toHaveCount(3)
  const item1 = Locator('.FeatureWebView:nth-of-type(1) .DefinitionListItem:nth-of-type(1)')
  await expect(item1).toBeVisible()
  const item1Heading = item1.locator('.DefinitionListItemHeading')
  await expect(item1Heading).toHaveText('ID')
  const item1Value = item1.locator('.DefinitionListItemValue')
  await expect(item1Value).toHaveText('builtin.test-webviews-1')
  const item2 = Locator('.FeatureWebView:nth-of-type(2) .DefinitionListItem:nth-of-type(1)')
  await expect(item2).toBeVisible()
  const item2Heading = item2.locator('.DefinitionListItemHeading')
  await expect(item2Heading).toHaveText('ID')
  const item2Value = item2.locator('.DefinitionListItemValue')
  await expect(item2Value).toHaveText('builtin.test-webviews-2')
  const item3 = Locator('.FeatureWebView:nth-of-type(3) .DefinitionListItem:nth-of-type(1)')
  await expect(item3).toBeVisible()
  const item3Heading = item3.locator('.DefinitionListItemHeading')
  await expect(item3Heading).toHaveText('ID')
  const item3Value = item3.locator('.DefinitionListItemValue')
  await expect(item3Value).toHaveText('builtin.test-webviews-3')
}
