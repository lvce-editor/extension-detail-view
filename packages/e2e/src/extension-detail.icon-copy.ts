import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ BaseUrl, ClipBoard, Command, ContextMenu, Extension, ExtensionDetail }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-repository-link')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-repository-link')
  await Command.execute('ExtensionDetail.handleImageContextMenu', 0, 0)

  // act
  await ContextMenu.selectItem('Copy Image Url')

  // assert
  const { host } = location
  const { protocol } = location
  const baseUrl = BaseUrl.getBaseUrl()
  const fullUrl = `${protocol}//${host}${baseUrl}/icons/extensionDefaultIcon.png`
  await ClipBoard.shouldHaveText(fullUrl)
}
