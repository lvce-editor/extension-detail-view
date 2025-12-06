import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-category-array')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-category-array')

  // assert
  const detailView = Locator('.ExtensionDetail')
  const category = detailView.locator('.Category')
  await expect(category).toHaveCount(1)
  await expect(category).toBeVisible()
  await expect(category).toHaveText('Formatters')
}
