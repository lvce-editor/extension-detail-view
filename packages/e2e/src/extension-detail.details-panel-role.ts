import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.details-panel-role'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const panel = Locator('.ExtensionDetailPanel')
  await expect(panel).toBeVisible()
  await expect(panel).toHaveAttribute('role', 'panel')
}
