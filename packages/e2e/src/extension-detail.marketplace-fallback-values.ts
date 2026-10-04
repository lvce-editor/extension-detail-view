import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.marketplace-fallback-values'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const entries = Locator('.AdditionalDetailsEntry:nth-of-type(2) .MoreInfoEntry')
  await expect(entries).toHaveCount(2)
  const publishedEntry = entries.nth(0)
  const lastReleasedEntry = entries.nth(1)
  const moreinfoentrykeyLocator = publishedEntry.locator('.MoreInfoEntryKey')
  await expect(moreinfoentrykeyLocator).toHaveText('Published')
  const moreinfoentryvalueLocator = publishedEntry.locator('.MoreInfoEntryValue')
  await expect(moreinfoentryvalueLocator).toHaveText('n/a')
  const moreinfoentrykeyLocator2 = lastReleasedEntry.locator('.MoreInfoEntryKey')
  await expect(moreinfoentrykeyLocator2).toHaveText('Last Released')
  const moreinfoentryvalueLocator2 = lastReleasedEntry.locator('.MoreInfoEntryValue')
  await expect(moreinfoentryvalueLocator2).toHaveText('n/a')
}
