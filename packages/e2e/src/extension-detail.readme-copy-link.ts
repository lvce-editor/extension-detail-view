import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = 1

export const test: Test = async ({ ClipBoard, Command, expect, Extension, ExtensionDetail, Locator }) => {
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
  await Command.execute('ExtensionDetail.copyReadmeLink', 'https://example.com')

  // assert
  await ClipBoard.shouldHaveText('https://example.com')
}
