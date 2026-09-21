/* eslint-disable e2e/no-direct-click */

import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.contents'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator, Settings }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-contents')
  await Settings.update({ extensionsShowContents: true })
  try {
    await Extension.addWebExtension(extensionUri)
    await ExtensionDetail.open('test.extension-contents')

    const contentsTab = Locator('button.ExtensionDetailTab[name="Contents"]')
    const detailsTab = Locator('button.ExtensionDetailTab[name="Details"]')
    const tree = Locator('.ExtensionDetailContentTree')
    const treeItems = tree.locator('.ExtensionDetailContentTreeItem')
    const contentFile = Locator('.ExtensionDetailContentFile')
    const panel = Locator('.ExtensionDetailPanel')
    await expect(contentsTab).toHaveCount(1)
    await contentsTab.click()

    await expect(treeItems).toHaveCount(3)
    await expect(contentFile).toHaveText('# Contents README\n\nThis is the default contents file.\n')

    await treeItems.nth(0).click()
    await expect(treeItems).toHaveCount(5)
    await treeItems.nth(1).click()
    await expect(treeItems).toHaveCount(6)
    await treeItems.nth(2).click()
    await expect(contentFile).toHaveText('<main>nested literal html</main>\n')

    await detailsTab.click()
    await expect(panel).toHaveCount(1)
    await contentsTab.click()
    await expect(contentFile).toHaveText('<main>nested literal html</main>\n')
  } finally {
    await Settings.update({ extensionsShowContents: false })
  }
}
