import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.tabs-button-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const tabs = Locator('.ExtensionDetailTabs button.ExtensionDetailTab')
  const detailsTab = tabs.nth(0)
  const featuresTab = tabs.nth(1)
  const securityTab = tabs.nth(2)
  const changelogTab = tabs.nth(3)
  await expect(tabs).toHaveCount(4)
  await expect(detailsTab).toHaveAttribute('name', 'Details')
  await expect(featuresTab).toHaveAttribute('name', 'Features')
  await expect(securityTab).toHaveAttribute('name', 'Security')
  await expect(changelogTab).toHaveAttribute('name', 'Changelog')
}
