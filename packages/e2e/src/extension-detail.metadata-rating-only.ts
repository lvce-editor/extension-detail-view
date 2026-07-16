import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.metadata-rating-only'

export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-rating-only')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-rating-only')

  // assert
  const metadata = Locator('.ExtensionDetailMetadata')
  await expect(metadata).toBeVisible()
  const downloadCount = Locator('.ExtensionDetailDownloadCount')
  await expect(downloadCount).toHaveCount(0)
  const rating = Locator('.ExtensionDetailRating')
  await expect(rating).toHaveText('3.3')
}
