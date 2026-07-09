import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-syntax-highlighting')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-readme-syntax-highlighting')

  const keyword = Locator('.ExtensionDetail .Markdown pre .Token.Keyword')
  await expect(keyword).toHaveText('const')
}
