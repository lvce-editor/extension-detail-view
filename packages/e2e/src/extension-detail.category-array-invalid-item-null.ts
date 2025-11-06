import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-category-array-invalid-item-null')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-category-array-invalid-item-null')

  // assert
  const detailView = Locator('.ExtensionDetail')
  const category = detailView.locator('.Category')
  await expect(category).toHaveCount(1)
  await expect(category).toBeVisible()
  await expect(category).toHaveText('null') // TODO should have error underline
}
