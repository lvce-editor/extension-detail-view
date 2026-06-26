import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-programming-languages-multiple'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-programming-languages-multiple')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.programming-languages-multiple')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('ProgrammingLanguages')

  // assert
  const table = Locator('.FeatureContent .Table')
  await expect(table).toBeVisible()
  const cells = table.locator('tbody td')
  await expect(cells).toHaveCount(10)
  await expect(cells.nth(0)).toHaveText('alpha')
  await expect(cells.nth(2)).toHaveText('.alpha.a')
  await expect(cells.nth(3)).toHaveText('yes')
  await expect(cells.nth(5)).toHaveText('beta')
  await expect(cells.nth(7)).toHaveText('.beta')
  await expect(cells.nth(8)).toHaveText('no')
}
