import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-json-validation-https-schema'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-json-validation-https-schema')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.json-validation-https-schema')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('JsonValidation')

  // assert
  const table = Locator('.FeatureContent .Table')
  await expect(table).toBeVisible()
  const schemaCell = table.locator('tbody td').nth(1)
  await expect(schemaCell).toHaveText('https://json.schemastore.org/prettierrc')
  await expect(schemaCell).toHaveAttribute('class', 'TableCell')
  const link = schemaCell.locator('a')
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('href', 'https://json.schemastore.org/prettierrc')
}
