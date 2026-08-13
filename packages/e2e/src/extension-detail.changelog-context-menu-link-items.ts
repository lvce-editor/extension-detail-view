import type { Test } from '@lvce-editor/test-with-playwright'
import { openChangelog } from '../test/OpenChangelog.ts'

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await openChangelog({ expect, Extension, ExtensionDetail, Locator }, extensionUri)

  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, 'https://example.com')

  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(4)
  const cut = menuItems.nth(0)
  const copy = menuItems.nth(1)
  const paste = menuItems.nth(2)
  const copyLink = menuItems.nth(3)
  await expect(cut).toHaveText('Cut')
  await expect(cut).toHaveAttribute('aria-disabled', 'true')
  await expect(copy).toHaveText('Copy')
  await expect(copy).toHaveAttribute('aria-disabled', null)
  await expect(paste).toHaveText('Paste')
  await expect(paste).toHaveAttribute('aria-disabled', 'true')
  await expect(copyLink).toHaveText('Copy Link')
  await expect(copyLink).toHaveAttribute('aria-disabled', null)
}
