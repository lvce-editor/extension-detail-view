import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-restore-scroll-position')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.restore-scroll-position')

  // assert
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const icon = Locator('.Markdown')
  await expect(icon).toBeVisible()
}
