import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.sidebar-aside'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const aside = Locator('aside.Aside')
  await expect(aside).toBeVisible()
  await expect(aside.locator('.AdditionalDetails')).toHaveCount(1)
}
