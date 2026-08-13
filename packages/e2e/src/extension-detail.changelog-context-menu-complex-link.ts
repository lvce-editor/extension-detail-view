import type { Test } from '@lvce-editor/test-with-playwright'
import { openChangelog } from '../test/OpenChangelog.ts'

export const test: Test = async ({ ClipBoard, Command, ContextMenu, expect, Extension, ExtensionDetail, Locator }) => {
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await openChangelog({ expect, Extension, ExtensionDetail, Locator }, extensionUri)
  const link = Locator('.Changelog a').nth(1)
  await expect(link).toBeVisible()

  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 17, 23, 'https://example.com/path?one=two#section')

  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(4)
  const copyLink = menuItems.nth(3)
  await expect(copyLink).toHaveText('Copy Link')
  await ContextMenu.selectItem('Copy Link')
  await ClipBoard.shouldHaveText('https://example.com/path?one=two#section')
}
