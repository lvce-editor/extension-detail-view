import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.metadata-values'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const downloadCount = Locator('.ExtensionDetailDownloadCount')
  const rating = Locator('.ExtensionDetailRating')
  await expect(downloadCount).toHaveText('12,345')
  await expect(rating).toHaveText('4.8')
}
