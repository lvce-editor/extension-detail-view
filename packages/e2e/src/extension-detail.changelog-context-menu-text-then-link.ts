import type { Test } from '@lvce-editor/test-with-playwright'
import { openChangelog } from '../test/OpenChangelog.ts'

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await openChangelog({ expect, Extension, ExtensionDetail, Locator }, extensionUri)
  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, '')
  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(3)

  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, 'https://example.com')

  await expect(menuItems).toHaveCount(4)
  const copyLink = menuItems.nth(3)
  await expect(copyLink).toHaveText('Copy Link')
}
