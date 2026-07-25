import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.categories-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const categoriesSection = Locator('.AdditionalDetailsEntry:nth-of-type(3)')
  await expect(categoriesSection.locator(':scope > .Categories')).toHaveCount(1)
  await expect(categoriesSection.locator('.Categories > button.Category')).toHaveCount(1)
}
