import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.tabs-rapid-switch'

export const test: Test = async ({ Command, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  const tabDetails = Locator('.ExtensionDetailTab[name="Details"]')
  const tabFeatures = Locator('.ExtensionDetailTab[name="Features"]')
  const tabChangelog = Locator('.ExtensionDetailTab[name="Changelog"]')
  await expect(tabDetails).toHaveAttribute('aria-selected', 'true')

  // act
  const pending: Promise<unknown>[] = []
  for (let i = 0; i < 5; i++) {
    pending.push(Command.execute('ExtensionDetail.selectTab', 'Features'))
    pending.push(Command.execute('ExtensionDetail.selectTab', 'Changelog'))
    pending.push(Command.execute('ExtensionDetail.selectTab', 'Details'))
  }
  await Promise.all(pending)
  await ExtensionDetail.selectDetails()

  // assert
  await expect(tabDetails).toHaveAttribute('aria-selected', 'true')
  await expect(tabFeatures).toHaveAttribute('aria-selected', 'false')
  await expect(tabChangelog).toHaveAttribute('aria-selected', 'false')
  const markdown = Locator('.Markdown')
  await expect(markdown).toBeVisible()
  await expect(markdown).toContainText('test readme')
}
