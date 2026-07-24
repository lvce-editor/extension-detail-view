import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-no-readme')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const icon = Locator('.Markdown')
  await expect(icon).toBeVisible()
  await expect(icon).toHaveText('No Readme Found.')
  const metadata = Locator('.ExtensionDetailMetadata')
  await expect(metadata).toHaveCount(0)
  const downloadCount = Locator('.ExtensionDetailDownloadCount')
  await expect(downloadCount).toHaveCount(0)
  const rating = Locator('.ExtensionDetailRating')
  await expect(rating).toHaveCount(0)
}
