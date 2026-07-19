import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.category-array-invalid-item-object'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-category-array-invalid-item-object')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-category-array-invalid-item-object')

  // assert
  const category = Locator('.ExtensionDetail .Category')
  await expect(category).toHaveCount(1)
  await expect(category).toHaveText('{"name":"Themes"}')
}
