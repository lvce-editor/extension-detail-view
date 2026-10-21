import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-keymaps'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  await Extension.addWebExtension(import.meta.resolve('../fixtures/extension-keymap'))
  await ExtensionDetail.open('test.keymap')
  await ExtensionDetail.selectFeatures()
  await ExtensionDetail.openFeature('Keymaps')
  const heading = Locator('.FeatureContent h1')
  await expect(heading).toHaveText('Keymaps')
  const cells = Locator('.FeatureContent .Table tbody td')
  const cell0 = cells.nth(0)
  await expect(cell0).toHaveText('normal')
  const cell1 = cells.nth(1)
  await expect(cell1).toHaveText('i')
  const cell2 = cells.nth(2)
  await expect(cell2).toHaveText('vim.handleKey')
  const cell3 = cells.nth(3)
  await expect(cell3).toHaveText('insert')
  const cell4 = cells.nth(4)
  await expect(cell4).toHaveText('insert')
  const cell5 = cells.nth(5)
  await expect(cell5).toHaveText('Escape')
  const cell6 = cells.nth(6)
  await expect(cell6).toHaveText('vim.handleKey')
  const cell7 = cells.nth(7)
  await expect(cell7).toHaveText('normal')
}
