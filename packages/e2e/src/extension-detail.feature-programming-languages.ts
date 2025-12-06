import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-programming-languages'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-programming-languages')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.programming-languages')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('ProgrammingLanguages')

  // assert
  const heading = Locator('.FeatureContent h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Programming Languages')
  const programmingLanguagesTable = Locator('.FeatureContent .Table')
  await expect(programmingLanguagesTable).toBeVisible()
  const tableHeadings = programmingLanguagesTable.locator('th')
  const heading1 = tableHeadings.nth(0)
  await expect(heading1).toHaveText('ID')
  const heading2 = tableHeadings.nth(1)
  await expect(heading2).toHaveText('Name')
  const heading3 = tableHeadings.nth(2)
  await expect(heading3).toHaveText('File Extensions')
  const heading4 = tableHeadings.nth(3)
  await expect(heading4).toHaveText('Grammar')
  const heading5 = tableHeadings.nth(4)
  await expect(heading5).toHaveText('Snippets')
  const tableCells = programmingLanguagesTable.locator('tbody td')
  const cell1 = tableCells.nth(0)
  await expect(cell1).toHaveText('css')
  const cell2 = tableCells.nth(1)
  await expect(cell2).toHaveText('')
  const cell3 = tableCells.nth(2)
  await expect(cell3).toHaveText('.css')
  const cell4 = tableCells.nth(3)
  await expect(cell4).toHaveText('yes')
  const cell5 = tableCells.nth(4)
  await expect(cell5).toHaveText('no')
}
