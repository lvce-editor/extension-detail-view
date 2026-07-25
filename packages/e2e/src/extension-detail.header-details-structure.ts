import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.header-details-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const details = Locator('.ExtensionDetailHeaderDetails')
  await expect(details.locator(':scope > .ExtensionDetailName')).toHaveCount(1)
  await expect(details.locator(':scope > .ExtensionDetailDescription')).toHaveCount(1)
  await expect(details.locator(':scope > .ExtensionDetailMetadata')).toHaveCount(1)
  await expect(details.locator(':scope > .ExtensionDetailHeaderActions')).toHaveCount(1)
}
