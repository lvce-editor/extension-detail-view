import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.metadata-accessibility'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const downloadCount = Locator('.ExtensionDetailDownloadCount')
  const rating = Locator('.ExtensionDetailRating')
  await expect(downloadCount).toHaveAttribute('aria-label', 'Downloads: 12,345')
  await expect(downloadCount).toHaveAttribute('title', 'Downloads: 12,345')
  await expect(rating).toHaveAttribute('aria-label', 'Rating: 4.8')
  await expect(rating).toHaveAttribute('title', 'Rating: 4.8')
}
