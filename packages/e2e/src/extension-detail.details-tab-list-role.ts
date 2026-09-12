import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.details-tab-list-role'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const tabs = Locator('.ExtensionDetailTabs')
  await expect(tabs).toBeVisible()
  await expect(tabs).toHaveAttribute('role', 'tablist')
}
