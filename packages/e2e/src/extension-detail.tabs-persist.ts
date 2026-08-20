import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.tabs-persist'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  await ExtensionDetail.selectFeatures()
  await ExtensionDetail.selectChangelog()

  const tabs = Locator('.ExtensionDetailTabs')
  await expect(tabs).toBeVisible()
  await expect(tabs.locator('.ExtensionDetailTab')).toHaveCount(4)
}
