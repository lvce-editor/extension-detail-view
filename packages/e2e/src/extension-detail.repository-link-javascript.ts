import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = 1
export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-repository-link-javascript')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-repository-link-javascript')

  // assert
  const detailView = Locator('.ExtensionDetail')
  const resourcesSection = detailView.locator('.AdditionalDetailsEntry').nth(3)
  await expect(resourcesSection).toBeVisible()
  const resourceItem3 = resourcesSection.locator('.Resource').nth(2)
  await expect(resourceItem3).toHaveText('Repository')
  await expect(resourceItem3).toHaveAttribute('href', null)
}
