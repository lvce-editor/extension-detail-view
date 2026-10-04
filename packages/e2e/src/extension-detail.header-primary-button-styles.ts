import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.header-primary-button-styles'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-basics')

  // assert
  const actions = Locator('.ExtensionDetailHeaderActions')
  const buttonprimaryLocator = actions.locator('button.Button.ButtonPrimary')
  await expect(buttonprimaryLocator).toHaveCount(3)
}
