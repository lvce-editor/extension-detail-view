import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.resources-entries'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const resources = Locator('.AdditionalDetailsEntry').nth(3).locator('.Resource')
  await expect(resources).toHaveCount(4)
  const marketplace = resources.nth(0)
  const issues = resources.nth(1)
  const repository = resources.nth(2)
  const license = resources.nth(3)
  await expect(marketplace).toHaveText('Marketplace')
  await expect(issues).toHaveText('Issues')
  await expect(repository).toHaveText('Repository')
  await expect(license).toHaveText('License')
}
