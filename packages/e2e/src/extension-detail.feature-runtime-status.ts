import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-runtime-status'

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-runtime-status')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.commands-test')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')
  const featureRuntimeStatus = Locator('.Feature[name="RuntimeStatus"]')
  await tabFeatures.click() // TODO use page object model

  // act
  await featureRuntimeStatus.click()

  // assert
  const heading = Locator('.FeatureContent h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Runtime Status')
  const definitionList = Locator('.FeatureContent dl')
  await expect(definitionList).toHaveText(`Status: none`)
}
