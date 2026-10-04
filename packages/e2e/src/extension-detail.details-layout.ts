import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.details-layout'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const panel = Locator('.ExtensionDetailPanel')
  const markdownLocator = panel.locator(':scope > .Markdown')
  await expect(markdownLocator).toHaveCount(1)
  const asideLocator = panel.locator(':scope > aside.Aside')
  await expect(asideLocator).toHaveCount(1)
}
