import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-activation-events-invalid-item-array'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-activation-events-invalid-item-array')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.activation-events-invalid-item-array')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('ActivationEvents')

  // assert
  const item = Locator('.FeatureContent li').nth(0)
  await expect(item).toBeVisible()
  await expect(item).toHaveClass('ListItemInvalid')
  await expect(item).toHaveText('["onStartup"]')
  await expect(item).toHaveAttribute('title', 'Property must be a string')
}
