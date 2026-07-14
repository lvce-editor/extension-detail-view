import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.large-combined-feature-details'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-large-combined')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-large-combined')
  await ExtensionDetail.selectFeatures()

  // act/assert
  await ExtensionDetail.openFeature('Settings')
  let heading = Locator('.FeatureContent h1')
  await expect(heading).toHaveText('Settings')
  let table = Locator('.FeatureContent .Table')
  let firstCell = table.locator('tbody td').nth(0)
  await expect(firstCell).toHaveText('combined.setting.alpha')

  await ExtensionDetail.openFeature('JsonValidation')
  heading = Locator('.FeatureContent h1')
  await expect(heading).toHaveText('Json Validation')
  table = Locator('.FeatureContent .Table')
  firstCell = table.locator('tbody td').nth(0)
  await expect(firstCell).toHaveText('*.combined.json')

  await ExtensionDetail.openFeature('ActivationEvents')
  heading = Locator('.FeatureContent h1')
  await expect(heading).toHaveText('Activation Events')
  const list = Locator('.FeatureContent ul')
  await expect(list).toContainText('onCommand:combined.command.alpha')

  await ExtensionDetail.openFeature('Commands')
  heading = Locator('.FeatureContent h1')
  await expect(heading).toHaveText('Commands')
  table = Locator('.FeatureContent .Table')
  firstCell = table.locator('tbody td').nth(0)
  await expect(firstCell).toHaveText('combined.command.alpha')
}
