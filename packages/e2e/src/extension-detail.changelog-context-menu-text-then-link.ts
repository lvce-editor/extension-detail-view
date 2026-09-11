import type { Test } from '@lvce-editor/test-with-playwright'
import { openChangelog } from '../test/OpenChangelog.ts'

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await openChangelog({ expect, Extension, ExtensionDetail, Locator }, extensionUri)

  // act
  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, '')

  // assert
  const menuItems = Locator('.MenuItem')
  await expect(menuItems).toHaveCount(3)

  // act
  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, 'https://example.com')

  // assert
  await expect(menuItems).toHaveCount(4)
  const copyLink = menuItems.nth(3)
  await expect(copyLink).toHaveText('Copy Link')
}
