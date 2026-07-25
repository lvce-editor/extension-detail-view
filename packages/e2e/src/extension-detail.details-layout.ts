import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.details-layout'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const panel = Locator('.ExtensionDetailPanel')
  await expect(panel.locator(':scope > .Markdown')).toHaveCount(1)
  await expect(panel.locator(':scope > aside.Aside')).toHaveCount(1)
}
