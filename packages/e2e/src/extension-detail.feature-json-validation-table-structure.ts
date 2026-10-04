import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-json-validation-table-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-json-validation')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.json-validation-test')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('JsonValidation')

  // assert
  const table = Locator('.FeatureContent > table.Table')
  const tableheadingLocator = table.locator('thead th.TableHeading')
  await expect(tableheadingLocator).toHaveCount(2)
  const locatorLocator = table.locator('tbody tr')
  await expect(locatorLocator).toHaveCount(1)
  const cells = table.locator('tbody td.TableCell')
  const fileMatch = cells.nth(0)
  const code = fileMatch.locator('code')
  await expect(cells).toHaveCount(2)
  await expect(fileMatch).toHaveText('*.test.json')
  await expect(code).toHaveCount(0)
}
