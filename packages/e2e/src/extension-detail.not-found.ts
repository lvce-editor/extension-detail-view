import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ expect, ExtensionDetail, Locator }) => {
  // act
  await ExtensionDetail.open('test.extension-not-found')

  // assert
  const error = Locator('.ExtensionDetailErrorCard')
  const errorMessage = Locator('.ExtensionDetailErrorMessage')
  const errorTitle = Locator('.ExtensionDetailErrorTitle')
  await expect(error).toBeVisible()
  await expect(errorTitle).toHaveText('Unable to load extension')
  await expect(errorMessage).toHaveText('The extension "test.extension-not-found" is not available in this version of LVCE Editor.')
}
