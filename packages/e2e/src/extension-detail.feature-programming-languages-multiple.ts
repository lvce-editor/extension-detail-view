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
  const firstLanguageId = cells.nth(0)
  const firstLanguageExtensions = cells.nth(2)
  const firstLanguageHasConfiguration = cells.nth(3)
  const secondLanguageId = cells.nth(5)
  const secondLanguageExtensions = cells.nth(7)
  const secondLanguageHasConfiguration = cells.nth(8)
  await expect(cells).toHaveCount(10)
  await expect(firstLanguageId).toHaveText('alpha')
  await expect(firstLanguageExtensions).toHaveText('.alpha.a')
  await expect(firstLanguageHasConfiguration).toHaveText('yes')
  await expect(secondLanguageId).toHaveText('beta')
  await expect(secondLanguageExtensions).toHaveText('.beta')
  await expect(secondLanguageHasConfiguration).toHaveText('no')
}
