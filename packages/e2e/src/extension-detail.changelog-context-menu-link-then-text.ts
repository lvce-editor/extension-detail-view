import type { Test } from '@lvce-editor/test-with-playwright'
import { openChangelog } from '../test/OpenChangelog.ts'

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await openChangelog({ expect, Extension, ExtensionDetail, Locator }, extensionUri)
  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, 'https://example.com')
  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(4)

  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, '')

  await expect(menuItems).toHaveCount(3)
  const lastItem = menuItems.nth(2)
  await expect(lastItem).toHaveText('Paste')
}
