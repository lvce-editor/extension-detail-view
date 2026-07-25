import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.readme-document-role'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const readme = Locator('.ExtensionDetailPanel .Markdown')
  await expect(readme).toBeVisible()
  await expect(readme).toHaveAttribute('role', 'document')
}
