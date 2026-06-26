import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-commands-multiple'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-commands-multiple')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.commands-multiple')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('Commands')

  // assert
  const table = Locator('.FeatureContent .Table')
  await expect(table).toBeVisible()
  const cells = table.locator('tbody td')
  await expect(cells).toHaveCount(4)
  await expect(cells.nth(0)).toHaveText('multiple.command.alpha')
  await expect(cells.nth(1)).toHaveText('Multiple Command Alpha')
  await expect(cells.nth(2)).toHaveText('multiple.command.beta')
  await expect(cells.nth(3)).toHaveText('Multiple Command Beta')
}
