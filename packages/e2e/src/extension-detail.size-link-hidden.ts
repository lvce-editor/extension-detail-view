import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail, Command }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  // act
  await Command.execute('ExtensionDetail.hideSizeLink')

  // assert
  const additionalDetails = Locator('.AdditionalDetailsEntry:nth-of-type(1)')
  await expect(additionalDetails).toBeVisible()
  const moreInfoEntry = additionalDetails.locator('.MoreInfoEntry:nth-of-type(4)')
  await expect(moreInfoEntry).toBeHidden()
}
