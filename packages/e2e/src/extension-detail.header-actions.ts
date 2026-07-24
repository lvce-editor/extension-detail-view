import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.header-actions'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const actions = Locator('.ExtensionDetailHeaderActions')
  await expect(actions).toBeVisible()
  const buttons = actions.locator('button.ButtonPrimary')
  const disableButton = buttons.nth(0)
  const uninstallButton = buttons.nth(1)
  await expect(buttons).toHaveCount(2)
  await expect(disableButton).toHaveAttribute('name', 'Disable')
  await expect(disableButton).toHaveText('Disable')
  await expect(uninstallButton).toHaveAttribute('name', 'Uninstall')
  await expect(uninstallButton).toHaveText('Uninstall')
}
