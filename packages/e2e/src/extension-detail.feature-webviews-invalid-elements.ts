import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-webviews-invalid-elements'

export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-webviews-invalid-elements')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.webviews-invalid-elements')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('WebViews')

  // assert
  const items = Locator('.DefinitionListItem')
  const item1 = items.nth(0)
  await expect(item1).toBeVisible()
  const item1Heading = item1.locator('.DefinitionListItemHeading')
  await expect(item1Heading).toBeVisible()
  await expect(item1Heading).toHaveText('ID')
  const item1Value = item1.locator('.DefinitionListItemValue')
  await expect(item1Value).toBeVisible()
  await expect(item1Value).toHaveText('builtin.test-webviews')
  const item2 = items.nth(1)
  const item2Heading = item2.locator('.DefinitionListItemHeading')
  await expect(item2Heading).toBeVisible()
  await expect(item2Heading).toHaveText('Selector')
  const item2Value = item2.locator('.DefinitionListItemValue')
  await expect(item2Value).toBeVisible()
  await expect(item2Value).toHaveText('[".test-webviews"]')
  const item3 = items.nth(2)
  const item3Heading = item3.locator('.DefinitionListItemHeading')
  await expect(item3Heading).toBeVisible()
  await expect(item3Heading).toHaveText('Content Security Policy')
  const item3Value = item3.locator('.DefinitionListItemValue')
  await expect(item3Value).toBeVisible()
  await expect(item3Value).toHaveText(`["default-src 'none'","script-src 'self'"]`)
}
