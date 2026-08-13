import type { Test } from '@lvce-editor/test-with-playwright'
import { openChangelog } from '../test/OpenChangelog.ts'

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await openChangelog({ expect, Extension, ExtensionDetail, Locator }, extensionUri)

  await Command.execute('ExtensionDetail.handleChangelogContextMenu', 0, 0, '')

  const copyLink = Locator('.MenuItem', { hasText: 'Copy Link' })
  await expect(copyLink).toHaveCount(0)
}
