import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-image-not-found')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-readme-image-not-found')

  // assert
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const markDown = Locator('.Markdown')
  await expect(markDown).toBeVisible()
  await expect(markDown).toHaveText('test readme\n\n')
  const link = markDown.locator('img')
  await expect(link).toHaveAttribute('onerror', null)
}
