import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-commands-empty'

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-commands-empty')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.commands-test')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('Commands')

  // assert
  const heading = Locator('.FeatureContent h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Commands')
  const paragraph = Locator('.FeatureContent p')
  await expect(paragraph).toHaveText('The extension contributes an empty commands array.')
}
