import type { Test, TestApi } from '@lvce-editor/test-with-playwright'

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    const { setTimeout } = globalThis as any
    setTimeout(resolve, ms)
  })
}

const waitForSelectedThemeTab = async (expect: TestApi['expect'], Locator: TestApi['Locator']): Promise<void> => {
  let lastError: unknown
  for (let i = 0; i < 20; i++) {
    const themeEditorTab = Locator('.MainTab.MainTabSelected[title$="color-theme.json"]')
    try {
      await expect(themeEditorTab).toBeVisible()
      await expect(themeEditorTab).toHaveText('color-theme.json')
      return
    } catch (error) {
      lastError = error
      await wait(50)
    }
  }
  throw lastError
}

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
  await expect(themeLink).toHaveAttribute('style', 'color: var(--LinkForeground, #3794ff)')

  // act
  await themeLink.dispatchEvent('click', { bubbles: true } as unknown as string)

  // assert
  await waitForSelectedThemeTab(expect, Locator)
}
