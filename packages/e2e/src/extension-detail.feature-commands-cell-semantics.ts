import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-commands-cell-semantics'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('Commands')

  const cells = Locator('.FeatureContent tbody td.TableCell')
  const id = cells.nth(0)
  const idCode = id.locator('code')
  const label = cells.nth(1)
  const labelCode = label.locator('code')
  await expect(cells).toHaveCount(2)
  await expect(idCode).toHaveText('test')
  await expect(labelCode).toHaveCount(0)
  await expect(label).toHaveText('Test')
}
