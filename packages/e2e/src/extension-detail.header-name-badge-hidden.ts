import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.header-name-badge-hidden'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const nameElement = Locator('.ExtensionDetailName')
  await expect(nameElement).toHaveText('Test')
  await expect(nameElement.locator('.ExtensionDetailNameBadge')).toHaveCount(0)
}
