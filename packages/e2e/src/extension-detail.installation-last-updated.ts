import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.installation-last-updated'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const entry = Locator('.AdditionalDetailsEntry').nth(0).locator('.MoreInfoEntry').nth(2)
  await expect(entry.locator('.MoreInfoEntryKey')).toHaveText('Last Updated')
  await expect(entry.locator('.MoreInfoEntryValue')).toHaveText('n/a')
}
