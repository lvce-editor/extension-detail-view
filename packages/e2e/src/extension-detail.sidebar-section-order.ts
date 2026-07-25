import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.sidebar-section-order'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const headings = Locator('.AdditionalDetails > .AdditionalDetailsEntry > .AdditionalDetailsTitle')
  const installation = headings.nth(0)
  const marketplace = headings.nth(1)
  const categories = headings.nth(2)
  const resources = headings.nth(3)
  await expect(headings).toHaveCount(4)
  await expect(installation).toHaveText('Installation')
  await expect(marketplace).toHaveText('Marketplace')
  await expect(categories).toHaveText('Categories')
  await expect(resources).toHaveText('Resources')
}
