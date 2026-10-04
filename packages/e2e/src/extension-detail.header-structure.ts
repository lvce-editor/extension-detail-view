import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.header-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const header = Locator('.ExtensionDetailHeader')
  await expect(header).toBeVisible()
  const extensiondetailiconLocator = header.locator('.ExtensionDetailIcon')
  await expect(extensiondetailiconLocator).toHaveCount(1)
  const extensiondetailheaderdetailsLocator = header.locator('.ExtensionDetailHeaderDetails')
  await expect(extensiondetailheaderdetailsLocator).toHaveCount(1)
}
