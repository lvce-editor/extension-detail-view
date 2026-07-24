import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.details-panel-role'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const panel = Locator('.ExtensionDetailPanel')
  await expect(panel).toBeVisible()
  await expect(panel).toHaveAttribute('role', 'tabpanel')
}
