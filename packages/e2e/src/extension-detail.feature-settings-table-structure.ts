import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-settings-table-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-settings')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.settings-test')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('Settings')

  const table = Locator('.FeatureContent > table.Table')
  await expect(table.locator('thead tr')).toHaveCount(1)
  await expect(table.locator('thead th.TableHeading')).toHaveCount(2)
  await expect(table.locator('tbody tr')).toHaveCount(1)
  await expect(table.locator('tbody td.TableCell')).toHaveCount(2)
}
