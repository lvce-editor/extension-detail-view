import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.header-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const header = Locator('.ExtensionDetailHeader')
  await expect(header).toBeVisible()
  await expect(header.locator('.ExtensionDetailIcon')).toHaveCount(1)
  await expect(header.locator('.ExtensionDetailHeaderDetails')).toHaveCount(1)
}
