import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-json-validation-table-alignment'

export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-json-validation')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.json-validation-test')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('JsonValidation')

  const table = Locator('.FeatureContent .Table')
  const heading = table.locator('th').nth(0)
  const cell = table.locator('tbody td').nth(0)
  await expect(heading).toHaveCSS('padding-left', '10px')
  await expect(cell).toHaveCSS('padding-left', '10px')
}
