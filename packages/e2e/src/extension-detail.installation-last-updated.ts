import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.installation-last-updated'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const entry = Locator('.AdditionalDetailsEntry').nth(0).locator('.MoreInfoEntry').nth(2)
  const moreinfoentrykeyLocator = entry.locator('.MoreInfoEntryKey')
  await expect(moreinfoentrykeyLocator).toHaveText('Last Updated')
  const moreinfoentryvalueLocator = entry.locator('.MoreInfoEntryValue')
  await expect(moreinfoentryvalueLocator).toHaveText('n/a')
}
