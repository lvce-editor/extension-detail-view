import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ ClipBoard, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-copy-link')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-readme-copy-link')
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const markDown = Locator('.Markdown')
  await expect(markDown).toBeVisible()
  await ClipBoard.enableMemoryClipBoard()

  // act
  await ExtensionDetail.copyReadmeLink('https://example.com')

  // assert
  await ClipBoard.shouldHaveText('https://example.com')
}
