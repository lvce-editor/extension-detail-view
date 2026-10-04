import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.sidebar-definition-lists'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const definitionLists = Locator('.AdditionalDetails dl.MoreInfo')
  await expect(definitionLists).toHaveCount(2)
  const installation = definitionLists.nth(0)
  const marketplace = definitionLists.nth(1)
  const locatorLocator = installation.locator('dt')
  await expect(locatorLocator).toHaveCount(4)
  const locatorLocator2 = marketplace.locator('dt')
  await expect(locatorLocator2).toHaveCount(2)
}
