import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.category-button'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const categories = Locator('.Categories')
  await expect(categories).toBeVisible()
  const category = categories.locator('button.Category')
  await expect(category).toHaveCount(1)
  await expect(category).toHaveAttribute('name', 'themes')
  await expect(category).toHaveText('Themes')
}
