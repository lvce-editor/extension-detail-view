import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-repository-invalid-null')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-repository-invalid-null')

  // assert
  const detailView = Locator('.ExtensionDetail')
  const resourcesSection = detailView.locator('.AdditionalDetailsEntry').nth(3)
  await expect(resourcesSection).toBeVisible()
  const resourceItem3 = resourcesSection.locator('.Resource').nth(2)
  await expect(resourceItem3).toHaveText('Repository')
  await expect(resourceItem3).toHaveAttribute('href', null)
}
