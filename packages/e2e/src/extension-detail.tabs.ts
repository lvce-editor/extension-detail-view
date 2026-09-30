import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.tabs'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

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
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Dispatch an actual DOM contextmenu event for browser coverage.
  await tabDetails.dispatchEvent('contextmenu', { bubbles: true, cancelable: true } as unknown as string)

  // assert
  await expect(tabFeatures).toHaveAttribute('aria-selected', 'true')
  const tabs = Locator('.ExtensionDetailTabs')
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Dispatch an actual DOM contextmenu event for browser coverage.
  await tabs.dispatchEvent('contextmenu', { bubbles: true, cancelable: true } as unknown as string)
  await expect(tabFeatures).toHaveAttribute('aria-selected', 'true')

  // act
  await ExtensionDetail.selectChangelog()

  // assert
  await expect(tabChangelog).toHaveAttribute('aria-selected', 'true')
}
