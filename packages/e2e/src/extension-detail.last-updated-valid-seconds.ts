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
  const lastUpdated = additionalDetails.locator('.MoreInfoEntry').nth(2)
  await expect(lastUpdated.locator('.MoreInfoEntryKey')).toHaveText('Last Updated')
  await expect(lastUpdated.locator('.MoreInfoEntryValue')).toContainText('2024')
}
