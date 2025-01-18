import type { Test } from '@lvce-editor/test-with-playwright'

export const skip = true

export const test: Test = async ({ Main, Locator, expect }) => {
  // arrange
  await Main.openUri('extension-detail://builtin.theme-ayu')
  const tabDetails = Locator('.ExtensionDetailTab[name="Details"]')
  await expect(tabDetails).toBeVisible()
  await expect(tabDetails).toHaveAttribute('aria-selected', 'true')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')
  await expect(tabFeatures).toBeVisible()
  const tabChangelog = Locator('.ExtensionDetailTab[name="Changelog"]')
  await expect(tabChangelog).toBeVisible()

  // TODO use page object model
  // act
  await tabFeatures.click()

  // assert
  await expect(tabFeatures).toHaveAttribute('aria-selected', 'true')

  // act
  await tabChangelog.click()

  // assert
  await expect(tabChangelog).toHaveAttribute('aria-selected', 'true')
}
