import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.readme-heading-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const markdown = Locator('.ExtensionDetailPanel > .Markdown')
  await expect(markdown.locator(':scope > h1')).toHaveCount(1)
  await expect(markdown.locator(':scope > h1')).toHaveText('test readme')
}
