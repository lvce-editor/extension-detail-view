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
  const firstCommandId = cells.nth(0)
  const firstCommandLabel = cells.nth(1)
  const secondCommandId = cells.nth(2)
  const secondCommandLabel = cells.nth(3)
  await expect(cells).toHaveCount(4)
  await expect(firstCommandId).toHaveText('multiple.command.alpha')
  await expect(firstCommandLabel).toHaveText('Multiple Command Alpha')
  await expect(secondCommandId).toHaveText('multiple.command.beta')
  await expect(secondCommandLabel).toHaveText('Multiple Command Beta')
}
