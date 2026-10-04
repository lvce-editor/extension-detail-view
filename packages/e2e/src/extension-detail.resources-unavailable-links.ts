import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.resources-unavailable-links'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const resources = Locator('.AdditionalDetailsEntry').nth(3)
  const resourceLocator = resources.locator('.Resource')
  await expect(resourceLocator).toHaveCount(4)
  const resourceLocator2 = resources.locator('a.Resource')
  await expect(resourceLocator2).toHaveCount(0)
}
