import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator, Settings }) => {
  // arrange
  await Settings.update({ 'extensions.linkBrowser': 'simpleBrowser', 'application.linkProtectionEnabled': false })
  const extensionUri = import.meta.resolve('../fixtures/extension-repository-link')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-repository-link')

  // act
  await Locator('.ExtensionDetail .Resource[href="https://example.com"]').click()

  // assert
  await expect(Locator('.SimpleBrowser')).toBeVisible()
  await expect(Locator('.SimpleBrowser input')).toHaveValue('https://example.com')
}
