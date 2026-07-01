import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.categories-multiple'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-categories-multiple')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-categories-multiple')

  // assert
  const categories = Locator('.Category')
  await expect(categories).toHaveCount(2)
  await expect(categories.nth(0)).toHaveText('Themes')
  await expect(categories.nth(1)).toHaveText('Formatters')
}
