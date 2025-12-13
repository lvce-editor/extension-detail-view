import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-long-description')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-long-description')

  // assert
  const description = Locator('.ExtensionDetailDescription')
  await expect(description).toBeVisible()
}
