import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.metadata-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const metadata = Locator('.ExtensionDetailMetadata')
  await expect(metadata.locator(':scope > .ExtensionDetailStatistic')).toHaveCount(2)
  await expect(metadata.locator(':scope > .ExtensionDetailDownloadCount')).toHaveCount(1)
  await expect(metadata.locator(':scope > .ExtensionDetailRating')).toHaveCount(1)
}
