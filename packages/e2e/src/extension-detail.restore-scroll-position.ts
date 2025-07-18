import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ Locator, expect, Extension, ExtensionDetail, Command }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-restore-scroll-position')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.restore-scroll-position')
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const markdown = Locator('.Markdown')
  await expect(markdown).toBeVisible()
  await Command.execute('ExtensionDetail.handleScroll', 10)
  await ExtensionDetail.selectTab('Features')

  // act
  await ExtensionDetail.selectTab('Details')

  // assert
  // TODO
  // await expect(markdown).toHaveProperty('scrollTop', 10)
}
