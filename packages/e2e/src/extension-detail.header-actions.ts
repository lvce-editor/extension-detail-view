import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.header-actions'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const actions = Locator('.ExtensionDetailHeaderActions')
  await expect(actions).toBeVisible()
  const buttons = actions.locator('button.ButtonPrimary')
  const disableButton = buttons.nth(0)
  const disableOptionsButton = buttons.nth(1)
  const uninstallButton = buttons.nth(2)
  await expect(buttons).toHaveCount(3)
  await expect(disableButton).toHaveAttribute('name', 'Disable')
  await expect(disableButton).toHaveText('Disable')
  await expect(disableOptionsButton).toHaveAttribute('name', 'DisableOptions')
  await expect(disableOptionsButton).toHaveAttribute('aria-label', 'Disable options')
  await expect(uninstallButton).toHaveAttribute('name', 'Uninstall')
  await expect(uninstallButton).toHaveText('Uninstall')
}
