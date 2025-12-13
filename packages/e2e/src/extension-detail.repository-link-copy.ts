import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ ClipBoard, ContextMenu, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-repository-link')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-repository-link')
  const detailView = Locator('.ExtensionDetail')
  const resourcesSection = detailView.locator('.AdditionalDetailsEntry').nth(3)
  await expect(resourcesSection).toBeVisible()
  await ExtensionDetail.handleReadmeContextMenu(0, 0, 'a', 'https://example.com')

  // act
  await ContextMenu.selectItem(`Copy Link`)

  // assert
  await ClipBoard.shouldHaveText(`https://example.com`)
}
