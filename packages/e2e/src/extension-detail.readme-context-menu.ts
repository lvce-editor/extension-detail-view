import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = 1

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-context-menu')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  // act

  // assert
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const markDown = Locator('.Markdown')
  await expect(markDown).toBeVisible()
  // await
}
