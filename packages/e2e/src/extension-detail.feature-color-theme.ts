import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-color-theme'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-detail-theme')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.theme-test')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('Theme')

  // assert
  const content = Locator('.FeatureContent')
  await expect(content).toBeVisible()
  const heading = content.locator('h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Themes')
  const listItems = content.locator('li')
  await expect(listItems).toHaveCount(1)
  const listItem1 = listItems.nth(0)
  await expect(listItem1).toHaveText('Test')
  const themeLink = listItem1.locator('a')
  await expect(themeLink).toHaveAttribute('title', 'color-theme.json')
  await expect(themeLink).toHaveClass('ColorThemeLink')

  // act
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Preserve this legacy Locator action until e2e commands replace it.
  await themeLink.dispatchEvent('click', { bubbles: true } as unknown as string)

  // assert
  const selectedThemeTab = Locator('.MainTab.MainTabSelected[title$="color-theme.json"]')
  await expect(selectedThemeTab).toBeVisible()
  await expect(selectedThemeTab).toHaveText('color-theme.json')
}
