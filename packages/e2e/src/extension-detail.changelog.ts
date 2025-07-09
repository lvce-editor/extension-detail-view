import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = 1

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-changelog')

  // assert
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const icon = Locator('.Markdown')
  await expect(icon).toBeVisible()
  await expect(icon).toHaveText('Error: Failed to get text: Not Found\n')
}
