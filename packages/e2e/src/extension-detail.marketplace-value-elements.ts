import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.marketplace-value-elements'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const marketplace = Locator('.AdditionalDetailsEntry:nth-of-type(2)')
  const values = marketplace.locator('dd.MoreInfoEntryValue')
  const published = values.nth(0)
  const lastReleased = values.nth(1)
  await expect(values).toHaveCount(2)
  await expect(published).toHaveText('n/a')
  await expect(lastReleased).toHaveText('n/a')
}
