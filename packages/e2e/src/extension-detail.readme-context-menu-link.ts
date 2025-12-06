import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = 1

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-context-menu')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-readme-context-menu')
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const markDown = Locator('.Markdown')
  await expect(markDown).toBeVisible()

  // act
  await Command.execute('ExtensionDetail.handleReadmeContextMenu', 0, 0, 'a', 'https://example.com')

  // assert
  // TODO verify that context menu is open
  // TODO should have copy link item
}
