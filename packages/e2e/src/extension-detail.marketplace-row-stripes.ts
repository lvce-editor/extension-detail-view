import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.marketplace-row-stripes'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const rows = Locator('.AdditionalDetailsEntry:nth-of-type(2) .MoreInfoEntry')
  const first = rows.nth(0)
  const second = rows.nth(1)
  await expect(first).toHaveAttribute('class', 'MoreInfoEntry MoreInfoEntryOdd')
  await expect(second).toHaveAttribute('class', 'MoreInfoEntry')
}
