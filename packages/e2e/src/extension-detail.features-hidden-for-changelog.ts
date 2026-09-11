import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.features-hidden-for-changelog'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.selectChangelog()

  // assert
  const features = Locator('.Features')
  const changelog = Locator('.ExtensionDetailPanel.Changelog')
  await expect(features).toHaveCount(0)
  await expect(changelog).toBeVisible()
}
