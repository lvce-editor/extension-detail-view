import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.features-layout'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  await ExtensionDetail.selectFeatures()

  // assert
  const features = Locator('.Features')
  await expect(features).toBeVisible()
  const featureslistLocator = features.locator('.FeaturesList')
  await expect(featureslistLocator).toHaveCount(1)
  const sashverticalLocator = features.locator('.Sash.SashVertical')
  await expect(sashverticalLocator).toHaveCount(1)
  const featurecontentLocator = features.locator('.FeatureContent')
  await expect(featurecontentLocator).toHaveCount(1)
}
