import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.error-alert'

export const test: Test = async ({ expect, ExtensionDetail, Locator }) => {
  // act
  await ExtensionDetail.open('test.extension-not-found')

  // assert
  const errorCard = Locator('.ExtensionDetailErrorCard')
  await expect(errorCard).toBeVisible()
  await expect(errorCard).toHaveAttribute('role', 'alert')
  const extensiondetailerrortitleLocator = errorCard.locator('h1.ExtensionDetailErrorTitle')
  await expect(extensiondetailerrortitleLocator).toHaveCount(1)
  const extensiondetailerrormessageLocator = errorCard.locator('p.ExtensionDetailErrorMessage')
  await expect(extensiondetailerrormessageLocator).toHaveCount(1)
  const maskiconwarningLocator = errorCard.locator('.ExtensionDetailErrorIcon.MaskIconWarning')
  await expect(maskiconwarningLocator).toHaveCount(1)
}
