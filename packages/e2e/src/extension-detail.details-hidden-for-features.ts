import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.details-hidden-for-features'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  await ExtensionDetail.selectFeatures()

  const details = Locator('.ExtensionDetailPanel')
  const features = Locator('.Features')
  await expect(details).toHaveCount(0)
  await expect(features).toBeVisible()
}
