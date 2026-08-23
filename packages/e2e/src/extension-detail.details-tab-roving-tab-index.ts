import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.details-tab-roving-tab-index'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-basics')

  const tabs = Locator('.ExtensionDetailTab')
  const detailsTab = tabs.nth(0)
  const featuresTab = tabs.nth(1)
  const changelogTab = tabs.nth(2)
  await expect(detailsTab).toHaveAttribute('tabindex', '0')
  await expect(featuresTab).toHaveAttribute('tabindex', '-1')
  await expect(changelogTab).toHaveAttribute('tabindex', '-1')
}
