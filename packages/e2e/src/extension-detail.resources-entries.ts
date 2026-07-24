import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.resources-entries'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const resources = Locator('.AdditionalDetailsEntry').nth(3).locator('.Resource')
  await expect(resources).toHaveCount(4)
  await expect(resources.nth(0)).toHaveText('Marketplace')
  await expect(resources.nth(1)).toHaveText('Issues')
  await expect(resources.nth(2)).toHaveText('Repository')
  await expect(resources.nth(3)).toHaveText('License')
}
