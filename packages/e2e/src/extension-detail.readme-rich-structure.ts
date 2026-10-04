import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.readme-rich-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-rich')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-readme-rich')

  // assert
  const markdown = Locator('.Markdown')
  const locatorLocator = markdown.locator('h1')
  await expect(locatorLocator).toHaveText('Rich Readme')
  const locatorLocator2 = markdown.locator('h2')
  await expect(locatorLocator2).toHaveText('Settings')
  const locatorLocator3 = markdown.locator('li')
  await expect(locatorLocator3).toHaveCount(3)
  const link = markdown.locator('a')
  await expect(link).toHaveAttribute('href', 'https://example.com/rich-readme')
}
