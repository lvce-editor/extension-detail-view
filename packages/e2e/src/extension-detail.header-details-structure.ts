import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.header-details-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const details = Locator('.ExtensionDetailHeaderDetails')
  const extensiondetailnameLocator = details.locator(':scope > .ExtensionDetailName')
  await expect(extensiondetailnameLocator).toHaveCount(1)
  const extensiondetaildescriptionLocator = details.locator(':scope > .ExtensionDetailDescription')
  await expect(extensiondetaildescriptionLocator).toHaveCount(1)
  const extensiondetailmetadataLocator = details.locator(':scope > .ExtensionDetailMetadata')
  await expect(extensiondetailmetadataLocator).toHaveCount(1)
  const extensiondetailheaderactionsLocator = details.locator(':scope > .ExtensionDetailHeaderActions')
  await expect(extensiondetailheaderactionsLocator).toHaveCount(1)
}
