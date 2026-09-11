import type { Test } from '@lvce-editor/test-with-playwright'
import { openChangelog } from '../test/OpenChangelog.ts'

export const test: Test = async ({ ClipBoard, Command, ContextMenu, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await openChangelog({ expect, Extension, ExtensionDetail, Locator }, extensionUri)

  // act
  // assert
  const link = Locator('.Changelog a').nth(2)
  await expect(link).toBeVisible()

  // act
  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, 'mailto:test@example.com')

  await ContextMenu.selectItem('Copy Link')

  // assert
  await ClipBoard.shouldHaveText('mailto:test@example.com')
}
