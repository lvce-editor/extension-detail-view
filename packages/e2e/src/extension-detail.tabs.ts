import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.tabs'

export const skip = 1

export const test: Test = async ({ Locator, expect, ExtensionDetail }) => {
  // arrange
  await ExtensionDetail.open('builtin.theme-ayu')
  const tabDetails = Locator('.ExtensionDetailTab[name="Details"]')
  await expect(tabDetails).toBeVisible()
  await expect(tabDetails).toHaveAttribute('aria-selected', 'true')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')
  await expect(tabFeatures).toBeVisible()
  const tabChangelog = Locator('.ExtensionDetailTab[name="Changelog"]')
  await expect(tabChangelog).toBeVisible()
  const markdown = Locator('.Markdown')
  await expect(markdown).toBeVisible()

  // act
  await ExtensionDetail.selectFeatures()

  // assert
  await expect(tabFeatures).toHaveAttribute('aria-selected', 'true')

  // act
  await ExtensionDetail.selectChangelog()

  // assert
  await expect(tabChangelog).toHaveAttribute('aria-selected', 'true')
}
