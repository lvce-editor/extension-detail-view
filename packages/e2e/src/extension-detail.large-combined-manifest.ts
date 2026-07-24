import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.large-combined-manifest'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-large-combined')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-large-combined')

  // act
  await ExtensionDetail.selectFeatures()

  // assert
  const features = Locator('.FeaturesList .Feature')
  await expect(features).toHaveCount(8)
  const themeFeature = features.nth(0)
  const commandsFeature = features.nth(1)
  const settingsFeature = features.nth(2)
  const jsonValidationFeature = features.nth(3)
  const programmingLanguagesFeature = features.nth(4)
  const webViewsFeature = features.nth(5)
  const activationEventsFeature = features.nth(6)
  const runtimeStatusFeature = features.nth(7)
  await expect(themeFeature).toHaveText('Themes')
  await expect(commandsFeature).toHaveText('Commands')
  await expect(settingsFeature).toHaveText('Settings')
  await expect(jsonValidationFeature).toHaveText('Json Validation')
  await expect(programmingLanguagesFeature).toHaveText('Programming Languages')
  await expect(webViewsFeature).toHaveText('WebViews')
  await expect(activationEventsFeature).toHaveText('Activation Events')
  await expect(runtimeStatusFeature).toHaveText('Runtime Status')
}
