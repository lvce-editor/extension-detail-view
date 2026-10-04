import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-theme-markdown-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-detail-theme')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.theme-test')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('Theme')

  // assert
  const content = Locator('.FeatureContent')
  const locatorLocator = content.locator(':scope > h1')
  await expect(locatorLocator).toHaveText('Themes')
  const markdown = content.locator(':scope > .DefaultMarkdown')
  await expect(markdown).toBeVisible()
  const locatorLocator2 = markdown.locator('h3')
  await expect(locatorLocator2).toHaveText('Color Themes')
  const locatorLocator3 = markdown.locator('li')
  await expect(locatorLocator3).toHaveText('Test')
}
