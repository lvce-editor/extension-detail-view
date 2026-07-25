import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.marketplace-row-order'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const keys = Locator('.AdditionalDetailsEntry:nth-of-type(2) .MoreInfoEntryKey')
  const published = keys.nth(0)
  const lastReleased = keys.nth(1)
  await expect(keys).toHaveCount(2)
  await expect(published).toHaveText('Published')
  await expect(lastReleased).toHaveText('Last Released')
}
