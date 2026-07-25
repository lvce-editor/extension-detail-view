import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.resources-fallback-elements'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const resources = Locator('.Resources')
  await expect(resources.locator(':scope > div.Resource')).toHaveCount(4)
  await expect(resources.locator(':scope > a.Resource')).toHaveCount(0)
}
