import type { Test } from '@lvce-editor/test-with-playwright'
import { openChangelog } from '../test/OpenChangelog.ts'

export const test: Test = async ({ ClipBoard, Command, ContextMenu, expect, Extension, ExtensionDetail, Locator }) => {
  await ClipBoard.enableMemoryClipBoard()
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await openChangelog({ expect, Extension, ExtensionDetail, Locator }, extensionUri)
  const link = Locator('.Changelog a').nth(2)
  await expect(link).toBeVisible()
  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, 'mailto:test@example.com')

  await ContextMenu.selectItem('Copy Link')

  await ClipBoard.shouldHaveText('mailto:test@example.com')
}
