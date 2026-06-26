import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-commands-large'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-large-commands')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-large-commands')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('Commands')

  // assert
  const commandsTable = Locator('.FeatureContent .Table')
  await expect(commandsTable).toBeVisible()
  const cells = commandsTable.locator('tbody td')
  await expect(cells).toHaveCount(50)
  await expect(cells.nth(0)).toHaveText('large.command.001')
  await expect(cells.nth(1)).toHaveText('Large Command 001')
  await expect(cells.nth(24)).toHaveText('large.command.013')
  await expect(cells.nth(25)).toHaveText('Large Command 013')
  await expect(cells.nth(48)).toHaveText('large.command.025')
  await expect(cells.nth(49)).toHaveText('Large Command 025')
}
