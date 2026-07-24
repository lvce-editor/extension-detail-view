import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.resource-link-security'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-resource-github')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-resource-github')

  const links = Locator('.Resources a.Resource')
  await expect(links).toHaveCount(3)
  for (let index = 0; index < 3; index++) {
    const link = links.nth(index)
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  }
}
