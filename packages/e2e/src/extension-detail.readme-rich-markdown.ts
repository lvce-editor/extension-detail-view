import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.readme-rich-markdown'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-rich')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-readme-rich')

  // assert
  const markdown = Locator('.Markdown')
  await expect(markdown).toBeVisible()
  await expect(markdown).toContainText('Rich Readme')
  await expect(markdown).toContainText('rich.enabled')
  await expect(markdown).toContainText('Done item')
  await expect(markdown).toContainText('Plain marker')
  const sectionLink = markdown.locator('a').nth(0)
  await expect(sectionLink).toHaveText('External section link')
  await expect(sectionLink).toHaveAttribute('target', '_blank')
  await expect(sectionLink).toHaveAttribute('rel', 'noreferrer noopener nofollow')
}
