import type { Test } from '@lvce-editor/test-with-playwright'
import { openChangelog } from '../test/OpenChangelog.ts'

export const test: Test = async ({ ClipBoard, Command, ContextMenu, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await openChangelog({ expect, Extension, ExtensionDetail, Locator }, extensionUri)

  // act
  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, 'https://example.com')

  // assert
  const menu = Locator('.Menu')
  await expect(menu).toBeVisible()

  // act
  await ContextMenu.selectItem('Copy Link')

  // assert
  await expect(menu).toBeHidden()
}
