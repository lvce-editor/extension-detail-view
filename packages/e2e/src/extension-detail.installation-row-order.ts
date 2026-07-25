import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.installation-row-order'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const keys = Locator('.AdditionalDetailsEntry:nth-of-type(1) .MoreInfoEntryKey')
  const identifier = keys.nth(0)
  const version = keys.nth(1)
  const lastUpdated = keys.nth(2)
  const size = keys.nth(3)
  await expect(keys).toHaveCount(4)
  await expect(identifier).toHaveText('Identifier')
  await expect(version).toHaveText('Version')
  await expect(lastUpdated).toHaveText('Last Updated')
  await expect(size).toHaveText('Size')
}
