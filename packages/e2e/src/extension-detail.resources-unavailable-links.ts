import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.resources-unavailable-links'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const resources = Locator('.AdditionalDetailsEntry').nth(3)
  await expect(resources.locator('.Resource')).toHaveCount(4)
  await expect(resources.locator('a.Resource')).toHaveCount(0)
}
