import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.readme-image-not-found'

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
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
  await expect(markDown).toContainText('test readme')
  const image = markDown.locator('img[src="./not-found.png"]')
  await expect(image).toBeVisible()
  await expect(image).toHaveAttribute('onerror', null)
  await Command.execute('ExtensionDetail.handleMarkdownImageError', './not-found.png')
  const imageError = markDown.locator('.MarkdownImageError')
  await expect(imageError).toBeVisible()
  await expect(imageError).toHaveText('Image cannot be loaded')
  await expect(image).toHaveCount(0)
}
