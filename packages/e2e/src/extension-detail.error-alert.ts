import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.error-alert'

export const test: Test = async ({ expect, ExtensionDetail, Locator }) => {
  await ExtensionDetail.open('test.extension-not-found')

  const errorCard = Locator('.ExtensionDetailErrorCard')
  await expect(errorCard).toBeVisible()
  await expect(errorCard).toHaveAttribute('role', 'alert')
  await expect(errorCard.locator('h1.ExtensionDetailErrorTitle')).toHaveCount(1)
  await expect(errorCard.locator('p.ExtensionDetailErrorMessage')).toHaveCount(1)
  await expect(errorCard.locator('.ExtensionDetailErrorIcon.MaskIconWarning')).toHaveCount(1)
}
