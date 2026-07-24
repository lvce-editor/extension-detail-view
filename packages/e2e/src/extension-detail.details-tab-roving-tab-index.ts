import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.details-tab-roving-tab-index'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const tabs = Locator('.ExtensionDetailTab')
  await expect(tabs.nth(0)).toHaveAttribute('tabindex', '0')
  await expect(tabs.nth(1)).toHaveAttribute('tabindex', '-1')
  await expect(tabs.nth(2)).toHaveAttribute('tabindex', '-1')
}
