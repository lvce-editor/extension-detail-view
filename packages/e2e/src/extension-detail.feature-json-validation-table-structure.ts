import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-json-validation-table-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-json-validation')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.json-validation-test')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('JsonValidation')

  const table = Locator('.FeatureContent > table.Table')
  await expect(table.locator('thead th.TableHeading')).toHaveCount(2)
  await expect(table.locator('tbody tr')).toHaveCount(1)
  const cells = table.locator('tbody td.TableCell')
  const fileMatch = cells.nth(0)
  const code = fileMatch.locator('code')
  await expect(cells).toHaveCount(2)
  await expect(fileMatch).toHaveText('*.test.json')
  await expect(code).toHaveCount(0)
}
