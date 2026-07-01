import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.large-readme'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-large-readme')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-large-readme')

  // assert
  const markdown = Locator('.Markdown')
  await expect(markdown).toBeVisible()
  await expect(markdown).toContainText('Large Readme')
  await expect(markdown).toContainText('Large readme tail marker.')
  const headings = markdown.locator('h2')
  await expect(headings).toHaveCount(7)
  const safeLink = markdown.locator('a').nth(0)
  await expect(safeLink).toHaveAttribute('href', 'https://example.com/section-01')
  const image = markdown.locator('img').nth(0)
  await expect(image).toHaveAttribute('onerror', null)
}
