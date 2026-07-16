import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-builtin')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-builtin')

  // assert
  const metadata = Locator('.ExtensionDetailMetadata')
  await expect(metadata).toHaveCount(0)
  const downloadCount = Locator('.ExtensionDetailDownloadCount')
  await expect(downloadCount).toHaveCount(0)
  const rating = Locator('.ExtensionDetailRating')
  await expect(rating).toHaveCount(0)
  const headings = Locator('.AdditionalDetailsTitle')
  await expect(headings).toHaveCount(3)
  const installationHeading = headings.nth(0)
  await expect(installationHeading).toHaveText('Installation')
  const categoriesHeading = headings.nth(1)
  await expect(categoriesHeading).toHaveText('Categories')
  const resourcesHeading = headings.nth(2)
  await expect(resourcesHeading).toHaveText('Resources')
}
