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
  await expect(tableheadingLocator).toHaveCount(3)
  const idHeading = tableheadingLocator.nth(0)
  const descriptionHeading = tableheadingLocator.nth(1)
  const defaultHeading = tableheadingLocator.nth(2)
  const locatorLocator2 = table.locator('tbody tr')
  await expect(locatorLocator2).toHaveCount(4)
  const tablecellLocator = table.locator('tbody td.TableCell')
  await expect(tablecellLocator).toHaveCount(12)
  await expect(idHeading).toHaveText('ID')
  await expect(descriptionHeading).toHaveText('Description')
  await expect(defaultHeading).toHaveText('Default')
  const tablecells = table.locator('tbody td.TableCell')
  const testIdCell = tablecells.nth(0)
  const testDescriptionCell = tablecells.nth(1)
  const testDefaultCell = tablecells.nth(2)
  const zeroIdCell = tablecells.nth(3)
  const zeroDescriptionCell = tablecells.nth(4)
  const zeroDefaultCell = tablecells.nth(5)
  const emptyIdCell = tablecells.nth(6)
  const emptyDescriptionCell = tablecells.nth(7)
  const emptyDefaultCell = tablecells.nth(8)
  const nullIdCell = tablecells.nth(9)
  const nullDescriptionCell = tablecells.nth(10)
  const nullDefaultCell = tablecells.nth(11)
  await expect(testIdCell).toHaveText('test')
  await expect(testDescriptionCell).toHaveText('Test')
  await expect(testDefaultCell).toHaveText('false')
  await expect(zeroIdCell).toHaveText('test.zero')
  await expect(zeroDescriptionCell).toHaveText('A zero default')
  await expect(zeroDefaultCell).toHaveText('0')
  await expect(emptyIdCell).toHaveText('test.empty')
  await expect(emptyDescriptionCell).toHaveText('An empty default')
  await expect(emptyDefaultCell).toHaveText('')
  await expect(nullIdCell).toHaveText('test.null')
  await expect(nullDescriptionCell).toHaveText('A null default')
  await expect(nullDefaultCell).toHaveText('null')
}
