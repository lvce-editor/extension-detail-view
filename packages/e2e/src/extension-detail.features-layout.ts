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
  await expect(features.locator('.FeaturesList')).toHaveCount(1)
  await expect(features.locator('.Sash.SashVertical')).toHaveCount(1)
  await expect(features.locator('.FeatureContent')).toHaveCount(1)
}
