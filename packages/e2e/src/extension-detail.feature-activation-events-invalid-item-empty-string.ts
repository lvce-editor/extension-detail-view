import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-activation-events-invalid-item-empty-string'

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-activation-events-invalid-item-empty-string')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.activation-events-invalid-item-empty-string')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('ActivationEvents')

  // assert
  const heading = Locator('.FeatureContent h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Activation Events')
  const list = Locator('.FeatureContent ul')
  await expect(list).toBeVisible()
  const item1 = list.locator('li').nth(0)
  await expect(item1).toHaveClass('ListItemInvalid')
  await expect(item1).toHaveText('')
  await expect(item1).toHaveAttribute('title', 'String must not be empty')
}
