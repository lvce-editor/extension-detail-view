import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.categories-heading'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const heading = Locator('.AdditionalDetailsTitle').nth(2)
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Categories')
}
