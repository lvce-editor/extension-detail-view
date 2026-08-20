import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.details-tab-roles'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const tabs = Locator('.ExtensionDetailTab')
  await expect(tabs).toHaveCount(4)
  const detailsTab = tabs.nth(0)
  const featuresTab = tabs.nth(1)
  const securityTab = tabs.nth(2)
  const changelogTab = tabs.nth(3)
  await expect(detailsTab).toHaveAttribute('role', 'tab')
  await expect(featuresTab).toHaveAttribute('role', 'tab')
  await expect(securityTab).toHaveAttribute('role', 'tab')
  await expect(changelogTab).toHaveAttribute('role', 'tab')
}
