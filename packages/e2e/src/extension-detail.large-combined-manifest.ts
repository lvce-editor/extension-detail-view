import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.large-combined-manifest'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-large-combined')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-large-combined')

  // act
  await ExtensionDetail.selectFeatures()

  // assert
  const features = Locator('.FeaturesList .Feature')
  await expect(features).toHaveCount(8)
  await expect(features.nth(0)).toHaveText('Theme')
  await expect(features.nth(1)).toHaveText('Commands')
  await expect(features.nth(2)).toHaveText('Settings')
  await expect(features.nth(3)).toHaveText('Json Validation')
  await expect(features.nth(4)).toHaveText('Programming Languages')
  await expect(features.nth(5)).toHaveText('WebViews')
  await expect(features.nth(6)).toHaveText('Activation Events')
  await expect(features.nth(7)).toHaveText('Runtime Status')
}
