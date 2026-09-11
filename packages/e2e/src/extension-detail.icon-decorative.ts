import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.icon-decorative'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const icon = Locator('.ExtensionDetailIcon')
  await expect(icon).toBeVisible()
  await expect(icon).toHaveAttribute('alt', '')
}
