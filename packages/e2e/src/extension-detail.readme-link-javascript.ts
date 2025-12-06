import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-readme-link-javascript')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-readme-link-javascript')

  // assert
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const markDown = Locator('.Markdown')
  await expect(markDown).toBeVisible()
  await expect(markDown).toHaveText('test readme\ntest\n')
  const link = markDown.locator('a')
  await expect(link).toHaveAttribute('href', 'javascript:alert(1)') // TODO should be sanitized
}
