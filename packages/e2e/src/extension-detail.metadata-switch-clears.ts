import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.metadata-switch-clears'

export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const basicsUri = import.meta.resolve('../fixtures/extension-basics')
  const resourceUri = import.meta.resolve('../fixtures/extension-resource-github')
  await Extension.addWebExtension(basicsUri)
  await Extension.addWebExtension(resourceUri)
  await ExtensionDetail.open('test.extension-basics')
  const metadata = Locator('.ExtensionDetailMetadata')
  await expect(metadata).toBeVisible()

  // act
  await ExtensionDetail.open('test.extension-resource-github')

  // assert
  await expect(metadata).toHaveCount(0)
  const extensionName = Locator('.ExtensionDetailName')
  await expect(extensionName).toHaveText('GitHub Resources')
}
