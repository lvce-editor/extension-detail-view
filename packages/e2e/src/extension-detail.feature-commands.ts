import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-commands'

export const skip = 1

export const test: Test = async ({ Main, Locator, expect, Extension }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-commands')
  await Extension.addWebExtension(extensionUri)
  await Main.openUri('extension-detail://test.commands-test')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')
  const featureCommands = Locator('.Feature[name="Commands"]')
  await tabFeatures.click()

  // act
  await featureCommands.click()

  // assert
  const heading = Locator('.FeatureCommands h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Commands')
}
