import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-settings'

export const test: Test = async ({ Main, Locator, expect, Extension }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-settings')
  await Extension.addWebExtension(extensionUri)
  await Main.openUri('extension-detail://test.settings-test')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')
  const featureSettings = Locator('.Feature[name="Settings"]')
  await tabFeatures.click()

  // act
  await featureSettings.click()

  // assert
  const heading = Locator('.FeatureSettings h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Settings')
}
