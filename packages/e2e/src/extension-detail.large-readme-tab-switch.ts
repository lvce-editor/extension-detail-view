import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.large-readme-tab-switch'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-large-readme')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-large-readme')
  const tabDetails = Locator('.ExtensionDetailTab[name="Details"]')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')
  const tabChangelog = Locator('.ExtensionDetailTab[name="Changelog"]')

  // act
  await Promise.all([ExtensionDetail.selectFeatures(), ExtensionDetail.selectChangelog(), ExtensionDetail.selectDetails()])
  await ExtensionDetail.selectDetails()

  // assert
  await expect(tabDetails).toHaveAttribute('aria-selected', 'true')
  await expect(tabFeatures).toHaveAttribute('aria-selected', 'false')
  await expect(tabChangelog).toHaveAttribute('aria-selected', 'false')
  const markdown = Locator('.Markdown')
  await expect(markdown).toContainText('Large readme tail marker.')
  const features = Locator('.Features')
  await expect(features).toBeHidden()
}
