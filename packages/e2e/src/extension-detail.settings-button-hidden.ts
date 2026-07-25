import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.settings-button-hidden'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const settingsButton = Locator('.ExtensionDetailHeaderActions .SettingsButton')
  await expect(settingsButton).toHaveCount(0)
}
