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
  await expect(cells).toHaveCount(4)
  await expect(cells.nth(0)).toHaveText('*.alpha.json')
  await expect(cells.nth(1)).toHaveText('./alpha.schema.json')
  await expect(cells.nth(2)).toHaveText('*.beta.json')
  await expect(cells.nth(3)).toHaveText('./beta.schema.json')
  await expect(cells.nth(1).locator('a')).toBeVisible()
  await expect(cells.nth(3).locator('a')).toBeVisible()
}
