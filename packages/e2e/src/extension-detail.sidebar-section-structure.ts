import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.sidebar-section-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const sections = Locator('.AdditionalDetails > .AdditionalDetailsEntry')
  await expect(sections).toHaveCount(4)
  const additionaldetailstitleLocator = sections.locator(':scope > .AdditionalDetailsTitle')
  await expect(additionaldetailstitleLocator).toHaveCount(4)
}
