import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-programming-languages-table-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-programming-languages')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.programming-languages')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('ProgrammingLanguages')

  // assert
  const table = Locator('.FeatureContent > table.Table')
  const tableheadingLocator = table.locator('thead th.TableHeading')
  await expect(tableheadingLocator).toHaveCount(5)
  const locatorLocator = table.locator('tbody tr')
  await expect(locatorLocator).toHaveCount(2)
  const cells = table.locator('tbody td.TableCell')
  const extension = cells.nth(2).locator('code')
  await expect(cells).toHaveCount(10)
  await expect(extension).toHaveText('.css')
}
