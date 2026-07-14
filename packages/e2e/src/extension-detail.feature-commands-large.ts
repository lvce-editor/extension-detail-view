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
  const firstCommandId = cells.nth(0)
  const firstCommandTitle = cells.nth(1)
  const middleCommandId = cells.nth(24)
  const middleCommandTitle = cells.nth(25)
  const lastCommandId = cells.nth(48)
  const lastCommandTitle = cells.nth(49)
  await expect(firstCommandId).toHaveText('large.command.001')
  await expect(firstCommandTitle).toHaveText('Large Command 001')
  await expect(middleCommandId).toHaveText('large.command.013')
  await expect(middleCommandTitle).toHaveText('Large Command 013')
  await expect(lastCommandId).toHaveText('large.command.025')
  await expect(lastCommandTitle).toHaveText('Large Command 025')
}
