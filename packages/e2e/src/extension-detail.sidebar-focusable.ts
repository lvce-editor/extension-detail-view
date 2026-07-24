import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.sidebar-focusable'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const additionalDetails = Locator('.AdditionalDetails')
  await expect(additionalDetails).toBeVisible()
  await expect(additionalDetails).toHaveAttribute('tabindex', '0')
}
