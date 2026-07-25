import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-commands-table-headings'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('Commands')

  const headings = Locator('.FeatureContent thead .TableHeading')
  const id = headings.nth(0)
  const label = headings.nth(1)
  await expect(headings).toHaveCount(2)
  await expect(id).toHaveText('ID')
  await expect(label).toHaveText('Label')
}
