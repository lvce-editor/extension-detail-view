import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.invalid-icon-path'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-invalid-icon-path')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-invalid-icon-path')

  // assert
  const icon = Locator('.ExtensionDetailIcon')
  await expect(icon).toBeVisible()
  await expect(icon).toHaveAttribute('onerror', null)
  await expect(icon).toHaveAttribute('draggable', 'false')
}
