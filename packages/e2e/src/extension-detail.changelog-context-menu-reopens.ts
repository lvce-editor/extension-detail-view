import type { Test } from '@lvce-editor/test-with-playwright'
import { openChangelog } from '../test/OpenChangelog.ts'

export const test: Test = async ({ ClipBoard, Command, ContextMenu, expect, Extension, ExtensionDetail, Locator }) => {
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await openChangelog({ expect, Extension, ExtensionDetail, Locator }, extensionUri)
  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, 'https://example.com')
  await ContextMenu.selectItem('Copy Link')
  const menu = Locator('.Menu')
  await expect(menu).toBeHidden()

  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, 'https://example.com')

  await expect(menu).toBeVisible()
  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(4)
}
