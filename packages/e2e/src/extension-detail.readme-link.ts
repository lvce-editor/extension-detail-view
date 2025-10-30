import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = 1

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-link')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const markDown = Locator('.Markdown')
  await expect(markDown).toBeVisible()
  await expect(markDown).toHaveText('test readme\nexample link\n')

  const link = markDown.locator('a')
  await expect(link).toHaveAttribute('href', 'https://example.com')

  // TODO
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
}
