import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.readme-malformed-links'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-malformed-links')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-readme-malformed-links')

  // assert
  const markdown = Locator('.Markdown')
  await expect(markdown).toBeVisible()
  await expect(markdown).toContainText('Malformed Readme Links')
  await expect(markdown).toContainText('Malformed markers: bold marker')
  const safeLink = markdown.locator('a').nth(0)
  await expect(safeLink).toHaveAttribute('href', 'https://example.com/safe')
}
