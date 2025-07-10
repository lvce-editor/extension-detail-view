import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-changelog')
  const tabChangelog = Locator('.ExtensionDetailTab[name="Changelog"]') // TODO use page object model

  // act
  await tabChangelog.click()
  const changelog = Locator('.Changelog')
  await expect(changelog).toBeVisible()
  await expect(changelog).toHaveText('Not Implemented')
}
