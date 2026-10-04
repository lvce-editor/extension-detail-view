import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.resources-fallback-elements'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const resources = Locator('.Resources')
  const resourceLocator = resources.locator(':scope > div.Resource')
  await expect(resourceLocator).toHaveCount(4)
  const resourceLocator2 = resources.locator(':scope > a.Resource')
  await expect(resourceLocator2).toHaveCount(0)
}
