import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-long-name')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-long-name')

  // assert
  const name = Locator('.ExtensionDetailName')
  await expect(name).toBeVisible()
}
