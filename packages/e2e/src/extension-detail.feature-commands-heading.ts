import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-commands-heading'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('Commands')

  // assert
  const content = Locator('.FeatureContent')
  await expect(content.locator(':scope > h1')).toHaveCount(1)
  await expect(content.locator(':scope > h1')).toHaveText('Commands')
}
