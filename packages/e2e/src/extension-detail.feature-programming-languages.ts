import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-programming-languages'

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
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
  const heading1 = programmingLanguagesTable.locator('th').nth(0)
  await expect(heading1).toHaveText('ID')
  const heading2 = programmingLanguagesTable.locator('th').nth(1)
  await expect(heading2).toHaveText('Name')
  const heading3 = programmingLanguagesTable.locator('th').nth(2)
  await expect(heading3).toHaveText('File Extensions')
  const heading4 = programmingLanguagesTable.locator('th').nth(3)
  await expect(heading4).toHaveText('Grammar')
  const heading5 = programmingLanguagesTable.locator('th').nth(4)
  await expect(heading5).toHaveText('Snippets')
  // const cell1 = programmingLanguagesTable.locator('tbody td').nth(0)
  // await expect(cell1).toHaveText('test')
  // const cell2 = programmingLanguagesTable.locator('tbody td').nth(1)
  // await expect(cell2).toHaveText('Test')
}
