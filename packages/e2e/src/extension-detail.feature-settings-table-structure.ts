import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-settings-table-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-settings')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.settings-test')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('Settings')

  // assert
  const table = Locator('.FeatureContent > table.Table')
  const locatorLocator = table.locator('thead tr')
  await expect(locatorLocator).toHaveCount(1)
  const tableheadingLocator = table.locator('thead th.TableHeading')
  await expect(tableheadingLocator).toHaveCount(2)
  const locatorLocator2 = table.locator('tbody tr')
  await expect(locatorLocator2).toHaveCount(1)
  const tablecellLocator = table.locator('tbody td.TableCell')
  await expect(tablecellLocator).toHaveCount(2)
}
