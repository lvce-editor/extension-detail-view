import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-json-validation-multiple'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-json-validation-multiple')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.json-validation-multiple')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('JsonValidation')

  // assert
  const table = Locator('.FeatureContent .Table')
  await expect(table).toBeVisible()
  const cells = table.locator('tbody td')
  const firstFileMatch = cells.nth(0)
  const firstSchema = cells.nth(1)
  const firstSchemaLink = firstSchema.locator('a')
  const secondFileMatch = cells.nth(2)
  const secondSchema = cells.nth(3)
  const secondSchemaLink = secondSchema.locator('a')
  await expect(cells).toHaveCount(4)
  await expect(firstFileMatch).toHaveText('*.alpha.json')
  await expect(firstSchema).toHaveText('./alpha.schema.json')
  await expect(secondFileMatch).toHaveText('*.beta.json')
  await expect(secondSchema).toHaveText('./beta.schema.json')
  await expect(firstSchemaLink).toBeVisible()
  await expect(secondSchemaLink).toBeVisible()
}
