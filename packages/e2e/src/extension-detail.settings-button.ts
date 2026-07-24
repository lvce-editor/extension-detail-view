import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-settings-menu')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-settings-menu')

  // assert
  const settingsButton = Locator('.ExtensionDetail .SettingsButton')
  await expect(settingsButton).toBeVisible()
  await expect(settingsButton).toHaveClass('IconButton')
  await expect(settingsButton).toHaveClass('SettingsButton')
  await expect(settingsButton).toHaveAttribute('name', 'Settings')
  await expect(settingsButton).toHaveAttribute('title', 'Settings')
  await expect(settingsButton).toHaveAttribute('aria-label', 'Settings')
  await expect(settingsButton).toHaveAttribute('aria-haspopup', 'menu')
  const settingsIcon = settingsButton.locator('.MaskIconSettingsGear')
  await expect(settingsIcon).toBeVisible()
}
