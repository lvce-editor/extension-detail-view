import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.features-rapid-switch'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-large-combined')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-large-combined')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('Settings')
  await ExtensionDetail.openFeature('JsonValidation')
  await ExtensionDetail.openFeature('ProgrammingLanguages')
  await ExtensionDetail.openFeature('WebViews')
  await ExtensionDetail.openFeature('ActivationEvents')
  await ExtensionDetail.openFeature('RuntimeStatus')
  await ExtensionDetail.openFeature('Commands')

  // assert
  const selectedFeature = Locator('.FeaturesList .FeatureSelected')
  await expect(selectedFeature).toHaveText('Commands')
  const heading = Locator('.FeatureContent h1')
  await expect(heading).toHaveText('Commands')
  const commandsTable = Locator('.FeatureContent .Table')
  await expect(commandsTable).toBeVisible()
  const firstCell = commandsTable.locator('tbody td').nth(0)
  await expect(firstCell).toHaveText('combined.command.alpha')
}
