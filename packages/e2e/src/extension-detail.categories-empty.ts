import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.categories-empty'

export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-no-readme')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const categories = detailView.locator('.Category')
  await expect(categories).toHaveCount(0)
}
