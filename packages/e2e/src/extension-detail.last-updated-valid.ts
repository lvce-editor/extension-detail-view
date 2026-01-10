import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-last-updated-valid')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-last-updated-valid')

  // assert
  const additionalDetails = Locator('.AdditionalDetailsEntry:nth-of-type(1)')
  await expect(additionalDetails).toBeVisible()
  const moreInfoEntry = additionalDetails.locator('.MoreInfoEntry:nth-of-type(3)')
  const moreInfoEntryKey = moreInfoEntry.locator('.MoreInfoEntryKey')
  await expect(moreInfoEntryKey).toHaveText('Last Updated')
  const moreInfoEntryValue = moreInfoEntry.locator('.MoreInfoEntryValue')
  await expect(moreInfoEntryValue).not.toHaveText('n/a')
  const value = await moreInfoEntryValue.textContent()
  expect(value).toMatch(/2024/)
}
