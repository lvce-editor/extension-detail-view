import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.last-updated-valid-seconds'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-last-updated-seconds')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-last-updated-seconds')

  // assert
  const additionalDetails = Locator('.AdditionalDetailsEntry:nth-of-type(1)')
  await expect(additionalDetails).toBeVisible()
  const lastUpdated = additionalDetails.locator('.MoreInfoEntry:nth-of-type(3)')
  const lastUpdatedKey = lastUpdated.locator('.MoreInfoEntryKey')
  const lastUpdatedValue = lastUpdated.locator('.MoreInfoEntryValue')
  await expect(lastUpdatedKey).toHaveText('Last Updated')
  await expect(lastUpdatedValue).toHaveText('2 years ago')
}
