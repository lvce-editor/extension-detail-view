import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.sidebar-definition-lists'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const definitionLists = Locator('.AdditionalDetails dl.MoreInfo')
  await expect(definitionLists).toHaveCount(2)
  await expect(definitionLists.nth(0).locator('dt')).toHaveCount(4)
  await expect(definitionLists.nth(1).locator('dt')).toHaveCount(2)
}
