import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-webviews-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-webviews')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.webviews-single')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('WebViews')

  const webView = Locator('.FeatureWebView')
  await expect(webView).toHaveCount(1)
  await expect(webView.locator(':scope > .DefinitionListItem')).toHaveCount(4)
  await expect(webView.locator('.DefinitionListItem > h2.DefinitionListItemHeading')).toHaveCount(4)
  await expect(webView.locator('.DefinitionListItem > pre.DefinitionListItemValue')).toHaveCount(4)
}
