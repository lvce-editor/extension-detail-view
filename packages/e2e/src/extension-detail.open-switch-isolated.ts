import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.open-switch-isolated'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const basicsUri = import.meta.resolve('../fixtures/extension-basics')
  const resourceUri = import.meta.resolve('../fixtures/extension-resource-github')
  await Extension.addWebExtension(basicsUri)
  await Extension.addWebExtension(resourceUri)
  await ExtensionDetail.open('test.extension-basics')
  await expect(Locator('.ExtensionDetailName')).toHaveText('Test')

  // act
  await ExtensionDetail.open('test.extension-resource-github')

  // assert
  await expect(Locator('.ExtensionDetailName')).toHaveText('GitHub Resources')
  await expect(Locator('.ExtensionDetailDescription')).toHaveText('Extension with a GitHub repository')
  await ExtensionDetail.selectFeatures()
  const features = Locator('.FeaturesList .Feature')
  await expect(features).toHaveCount(1)
  await expect(features.nth(0)).toHaveText('Commands')
}
