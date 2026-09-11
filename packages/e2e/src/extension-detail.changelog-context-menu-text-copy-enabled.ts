import type { Test } from '@lvce-editor/test-with-playwright'
import { openChangelog } from '../test/OpenChangelog.ts'

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await openChangelog({ expect, Extension, ExtensionDetail, Locator }, extensionUri)

  // act

  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, '')

  // assert
  const copy = Locator('.MenuItem').nth(1)
  await expect(copy).toHaveText('Copy')
  await expect(copy).toHaveAttribute('aria-disabled', null)
}
