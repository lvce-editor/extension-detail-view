import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-webviews-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-webviews')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.webviews-single')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('WebViews')

  // assert
  const webView = Locator('.FeatureWebView')
  await expect(webView).toHaveCount(1)
  const definitionlistitemLocator = webView.locator(':scope > .DefinitionListItem')
  await expect(definitionlistitemLocator).toHaveCount(4)
  const definitionlistitemheadingLocator = webView.locator('.DefinitionListItem > h2.DefinitionListItemHeading')
  await expect(definitionlistitemheadingLocator).toHaveCount(4)
  const definitionlistitemvalueLocator = webView.locator('.DefinitionListItem > pre.DefinitionListItemValue')
  await expect(definitionlistitemvalueLocator).toHaveCount(4)
}
