import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.readme-rich-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-rich')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-readme-rich')

  const markdown = Locator('.Markdown')
  await expect(markdown.locator('h1')).toHaveText('Rich Readme')
  await expect(markdown.locator('h2')).toHaveText('Settings')
  await expect(markdown.locator('li')).toHaveCount(3)
  const link = markdown.locator('a')
  await expect(link).toHaveAttribute('href', 'https://example.com/rich-readme')
}
