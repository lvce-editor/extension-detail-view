import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-selection-tab-switch'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')
  await ExtensionDetail.selectFeatures()
  await ExtensionDetail.openFeature('Commands')
  await expect(Locator('.FeaturesList .FeatureSelected')).toHaveText('Commands')

  // act
  await ExtensionDetail.selectDetails()
  await ExtensionDetail.selectFeatures()

  // assert
  const selectedFeature = Locator('.FeaturesList .FeatureSelected')
  await expect(selectedFeature).toHaveCount(1)
  await expect(selectedFeature).toHaveText('Commands')
}
