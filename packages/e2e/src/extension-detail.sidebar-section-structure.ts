import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.sidebar-section-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const sections = Locator('.AdditionalDetails > .AdditionalDetailsEntry')
  await expect(sections).toHaveCount(4)
  await expect(sections.locator(':scope > .AdditionalDetailsTitle')).toHaveCount(4)
}
