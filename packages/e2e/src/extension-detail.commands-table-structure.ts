import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.commands-table-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('Commands')

  // assert
  const table = Locator('.FeatureContent table.Table')
  await expect(table).toBeVisible()
  const locatorLocator = table.locator('thead th')
  await expect(locatorLocator).toHaveCount(2)
  const locatorLocator2 = table.locator('tbody tr')
  await expect(locatorLocator2).toHaveCount(1)
  const locatorLocator3 = table.locator('tbody td')
  await expect(locatorLocator3).toHaveCount(2)
}
