import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.metadata-download-count-only'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-download-count-only')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-download-count-only')

  // assert
  const metadata = Locator('.ExtensionDetailMetadata')
  await expect(metadata).toBeVisible()
  const downloadCount = Locator('.ExtensionDetailDownloadCount')
  await expect(downloadCount).toHaveText('9,876,543')
  const rating = Locator('.ExtensionDetailRating')
  await expect(rating).toHaveCount(0)
}
