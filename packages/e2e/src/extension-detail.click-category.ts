import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = 1

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')
  const detailView = Locator('.ExtensionDetail')
  const category = detailView.locator('.Category')
  await expect(category).toBeVisible()
  await expect(category).toHaveText('Themes')

  // act
  await category.click()

  // assert
}
