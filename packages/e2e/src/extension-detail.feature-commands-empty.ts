import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-commands-empty'

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-commands-empty')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.commands-test')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')
  const featureCommands = Locator('.Feature[name="Commands"]')
  await tabFeatures.click()

  // act
  await featureCommands.click()

  // assert
  const heading = Locator('.FeatureContent h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Commands')
  const paragraph = Locator('.FeatureContent p')
  await expect(paragraph).toHaveText('The extension contributed an empty commands array.')
}
