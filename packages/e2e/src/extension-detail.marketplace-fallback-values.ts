import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.marketplace-fallback-values'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const entries = Locator('.AdditionalDetailsEntry').nth(1).locator('.MoreInfoEntry')
  await expect(entries).toHaveCount(2)
  await expect(entries.nth(0).locator('.MoreInfoEntryKey')).toHaveText('Published')
  await expect(entries.nth(0).locator('.MoreInfoEntryValue')).toHaveText('n/a')
  await expect(entries.nth(1).locator('.MoreInfoEntryKey')).toHaveText('Last Released')
  await expect(entries.nth(1).locator('.MoreInfoEntryValue')).toHaveText('n/a')
}
