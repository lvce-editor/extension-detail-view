import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.header-builtin-badge'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-builtin')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-builtin')

  const nameElement = Locator('.ExtensionDetailName')
  const name = nameElement.locator(':scope > span').nth(0)
  await expect(name).toHaveText('Test Builtin Extension')
  const badge = nameElement.locator('.ExtensionDetailNameBadge')
  await expect(badge).toBeVisible()
  await expect(badge).toHaveText('builtin')
}
