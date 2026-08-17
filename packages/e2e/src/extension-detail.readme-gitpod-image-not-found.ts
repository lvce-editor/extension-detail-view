import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.readme-gitpod-image-not-found'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-gitpod-image-not-found')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-readme-gitpod-image-not-found')

  // assert
  const markDown = Locator('.Markdown')
  await expect(markDown).toBeVisible()
  const src = 'https://gitpod.io/button/open-in-gitpod.svg'
  const image = markDown.locator(`img[src="${src}"]`)
  await ExtensionDetail.handleMarkdownImageError(src)
  const imageError = markDown.locator('.MarkdownImageError')
  await expect(imageError).toBeVisible()
  await expect(imageError).toHaveText('Gitpod Image failed to load')
  await expect(image).toHaveCount(0)
}
