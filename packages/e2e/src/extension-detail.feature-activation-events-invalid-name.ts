import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-activation-events-invalid-name'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-activation-events-invalid-name')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.activation-events-invalid-name')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('ActivationEvents')

  // assert
  const item = Locator('.FeatureContent li').nth(0)
  await expect(item).toHaveClass('ListItemInvalid')
  await expect(item).toHaveText('onLangague:typescript')
  await expect(item).toHaveAttribute('title', 'Invalid activation event onLangague:typescript. Did you mean onLanguage:typescript?')
}
