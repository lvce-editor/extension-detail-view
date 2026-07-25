import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-theme-markdown-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-detail-theme')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.theme-test')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('Theme')

  const content = Locator('.FeatureContent')
  await expect(content.locator(':scope > h1')).toHaveText('Themes')
  const markdown = content.locator(':scope > .DefaultMarkdown')
  await expect(markdown).toBeVisible()
  await expect(markdown.locator('h3')).toHaveText('Color Themes')
  await expect(markdown.locator('li')).toHaveText('Test')
}
