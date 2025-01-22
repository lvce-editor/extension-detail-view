import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-webviews'

export const skip = 1

export const test: Test = async ({ Main, Locator, expect, Extension }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-webviews')
  await Extension.addWebExtension(extensionUri)
  await Main.openUri('extension-detail://test.webviews-test')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')
  const featureWebViews = Locator('.Feature[name="WebViews"]')
  await tabFeatures.click()

  // act
  await featureWebViews.click()

  // assert
  const heading = Locator('.FeatureCommands h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('WebViews')
  // TODO
}
