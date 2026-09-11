import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.root-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const header = Locator('.ExtensionDetail > .ExtensionDetailHeader')
  const tabs = Locator('.ExtensionDetailTabs')
  const panel = Locator('.ExtensionDetail > .ExtensionDetailPanel')
  await expect(header).toHaveCount(1)
  await expect(tabs).toHaveCount(1)
  await expect(panel).toHaveCount(1)
}
