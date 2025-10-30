import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-json-validation-link-empty-array'

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-json-validation-schema-link-empty-array')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.json-validation-schema-link-empty-array')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('JsonValidation')

  // assert
  const heading = Locator('.FeatureContent h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Json Validation')
  const commandsTable = Locator('.FeatureContent .Table')
  await expect(commandsTable).toBeVisible()
  const cell2 = commandsTable.locator('tbody td').nth(1)
  await expect(cell2).toHaveText('[]')
  const link = cell2.locator('a')
  await expect(link).toBeHidden()
}
