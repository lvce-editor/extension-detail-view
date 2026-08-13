import type { Test } from '@lvce-editor/test-with-playwright'
import { openChangelog } from '../test/OpenChangelog.ts'

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await openChangelog({ expect, Extension, ExtensionDetail, Locator }, extensionUri)

  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, 'https://example.com')

  const menu = Locator('.Menu')
  await expect(menu).toHaveAttribute('role', 'menu')
  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(4)
  for (let index = 0; index < 4; index++) {
    const menuItem = menuItems.nth(index)
    await expect(menuItem).toHaveAttribute('role', 'menuitem')
  }
}
