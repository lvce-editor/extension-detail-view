import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.changelog'

export const skip = 1

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-changelog')

  // act
  await ExtensionDetail.selectChangelog()

  // assert
  const changelog = Locator('.Changelog')
  await expect(changelog).toBeVisible()
  await expect(changelog).toHaveText('Not Implemented')
}
