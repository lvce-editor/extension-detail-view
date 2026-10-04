import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.metadata-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const metadata = Locator('.ExtensionDetailMetadata')
  const extensiondetailstatisticLocator = metadata.locator(':scope > .ExtensionDetailStatistic')
  await expect(extensiondetailstatisticLocator).toHaveCount(2)
  const extensiondetaildownloadcountLocator = metadata.locator(':scope > .ExtensionDetailDownloadCount')
  await expect(extensiondetaildownloadcountLocator).toHaveCount(1)
  const extensiondetailratingLocator = metadata.locator(':scope > .ExtensionDetailRating')
  await expect(extensiondetailratingLocator).toHaveCount(1)
}
