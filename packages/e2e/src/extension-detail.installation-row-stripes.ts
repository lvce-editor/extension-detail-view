import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.installation-row-stripes'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const rows = Locator('.AdditionalDetailsEntry:nth-of-type(1) .MoreInfoEntry')
  const first = rows.nth(0)
  const second = rows.nth(1)
  const third = rows.nth(2)
  const fourth = rows.nth(3)
  await expect(first).toHaveAttribute('class', 'MoreInfoEntry MoreInfoEntryOdd')
  await expect(second).toHaveAttribute('class', 'MoreInfoEntry')
  await expect(third).toHaveAttribute('class', 'MoreInfoEntry MoreInfoEntryOdd')
  await expect(fourth).toHaveAttribute('class', 'MoreInfoEntry')
}
