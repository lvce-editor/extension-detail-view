import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.readme-inline-code'

// This regression depends on the markdown-worker release being integrated by LVCE Editor.
export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-inline-code')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-readme-inline-code')

  // assert
  const paragraph = Locator('.Markdown p')
  await expect(paragraph).toHaveText('Relative imports, package main, conditional exports, and CommonJS require are supported.')
  const code = paragraph.locator('code')
  await expect(code).toHaveCount(3)
  const main = code.nth(0)
  const exports = code.nth(1)
  const require = code.nth(2)
  await expect(main).toHaveText('main')
  await expect(exports).toHaveText('exports')
  await expect(require).toHaveText('require')
  await expect(code).toHaveCSS('display', 'inline')
}
