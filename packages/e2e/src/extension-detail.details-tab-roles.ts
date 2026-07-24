import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.details-tab-roles'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const tabs = Locator('.ExtensionDetailTab')
  await expect(tabs).toHaveCount(3)
  await expect(tabs.nth(0)).toHaveAttribute('role', 'tab')
  await expect(tabs.nth(1)).toHaveAttribute('role', 'tab')
  await expect(tabs.nth(2)).toHaveAttribute('role', 'tab')
}
