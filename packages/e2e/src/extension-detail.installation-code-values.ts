import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.installation-code-values'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const installation = Locator('.AdditionalDetailsEntry:nth-of-type(1)')
  const codeValues = installation.locator('code.MoreInfoEntryValue')
  const identifier = codeValues.nth(0)
  const version = codeValues.nth(1)
  await expect(codeValues).toHaveCount(2)
  await expect(identifier).toHaveText('test.extension-basics')
  await expect(version).toHaveText('n/a')
}
