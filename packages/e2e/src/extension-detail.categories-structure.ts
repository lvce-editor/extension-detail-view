import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.categories-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const categoriesSection = Locator('.AdditionalDetailsEntry:nth-of-type(3)')
  const categoriesLocator = categoriesSection.locator(':scope > .Categories')
  await expect(categoriesLocator).toHaveCount(1)
  const categoryLocator = categoriesSection.locator('.Categories > button.Category')
  await expect(categoryLocator).toHaveCount(1)
}
