import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-selected-button'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  await ExtensionDetail.selectFeatures()

  const selectedFeature = Locator('.FeaturesList button.FeatureSelected')
  await expect(selectedFeature).toHaveCount(1)
  await expect(selectedFeature).toHaveClass('Feature')
  await expect(selectedFeature).toHaveAttribute('name', 'Commands')
  await expect(selectedFeature).toHaveText('Commands')
}
