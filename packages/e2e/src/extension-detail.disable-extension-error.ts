import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.disable-extension-error'

// export const skip = 1

export const test: Test = async ({ Command, Extension, ExtensionDetail }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-enable-error')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-enable-error')

  // act
  await Command.execute('ExtensionDetail.handleClickDisable')
  // await Command.execute('ExtensionDetail.handleClickSetColorTheme')

  // assert
  // const activityBar = Locator('.ActivityBar')
  // await expect(activityBar).toHaveCSS('background-color', 'rgb(255, 165, 0)')
}
