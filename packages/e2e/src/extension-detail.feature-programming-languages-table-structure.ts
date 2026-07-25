import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-programming-languages-table-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-programming-languages')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.programming-languages')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('ProgrammingLanguages')

  const table = Locator('.FeatureContent > table.Table')
  await expect(table.locator('thead th.TableHeading')).toHaveCount(5)
  await expect(table.locator('tbody tr')).toHaveCount(1)
  const cells = table.locator('tbody td.TableCell')
  const extension = cells.nth(2).locator('code')
  await expect(cells).toHaveCount(5)
  await expect(extension).toHaveText('.css')
}
