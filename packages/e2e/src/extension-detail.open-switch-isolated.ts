import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.open-switch-isolated'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const basicsUri = import.meta.resolve('../fixtures/extension-basics')
  const resourceUri = import.meta.resolve('../fixtures/extension-resource-github')
  await Extension.addWebExtension(basicsUri)
  await Extension.addWebExtension(resourceUri)
  await ExtensionDetail.open('test.extension-basics')
  const extensionName = Locator('.ExtensionDetailName')
  await expect(extensionName).toHaveText('Test')

  // act
  await ExtensionDetail.open('test.extension-resource-github')

  // assert
  const extensionDescription = Locator('.ExtensionDetailDescription')
  await expect(extensionName).toHaveText('GitHub Resources')
  await expect(extensionDescription).toHaveText('Extension with a GitHub repository')
  await ExtensionDetail.selectFeatures()
  const features = Locator('.FeaturesList .Feature')
  const firstFeature = features.nth(0)
  await expect(features).toHaveCount(1)
  await expect(firstFeature).toHaveText('Commands')
}
