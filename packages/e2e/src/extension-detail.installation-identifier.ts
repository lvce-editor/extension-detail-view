import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.installation-identifier'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const entry = Locator('.AdditionalDetailsEntry').nth(0).locator('.MoreInfoEntry').nth(0)
  await expect(entry.locator('.MoreInfoEntryKey')).toHaveText('Identifier')
  await expect(entry.locator('.MoreInfoEntryValue')).toHaveText('test.extension-basics')
}
