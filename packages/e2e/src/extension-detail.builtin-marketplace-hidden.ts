import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-builtin')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-builtin')

  // assert
  const headings = Locator('.AdditionalDetailsTitle')
  await expect(headings).toHaveCount(3)
  const installationHeading = headings.nth(0)
  await expect(installationHeading).toHaveText('Installation')
  const categoriesHeading = headings.nth(1)
  await expect(categoriesHeading).toHaveText('Categories')
  const resourcesHeading = headings.nth(2)
  await expect(resourcesHeading).toHaveText('Resources')
}
