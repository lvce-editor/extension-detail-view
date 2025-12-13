import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')
  const detailView = Locator('.ExtensionDetail')
  const category = detailView.locator('.Category')
  await expect(category).toBeVisible()
  await expect(category).toHaveText('Themes')

  // act
  await ExtensionDetail.handleClickCategory('Themes')

  // assert
  const extensionSearchView = Locator('.Extensions')
  await expect(extensionSearchView).toBeVisible()
  const searchInput = Locator('[name="extensions"]')
  await expect(searchInput).toBeVisible()
  await expect(searchInput).toHaveValue('@category:"Themes"')
}
