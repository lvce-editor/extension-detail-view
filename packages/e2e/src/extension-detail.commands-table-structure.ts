import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.commands-table-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('Commands')

  const table = Locator('.FeatureContent table.Table')
  await expect(table).toBeVisible()
  await expect(table.locator('thead th')).toHaveCount(2)
  await expect(table.locator('tbody tr')).toHaveCount(1)
  await expect(table.locator('tbody td')).toHaveCount(2)
}
