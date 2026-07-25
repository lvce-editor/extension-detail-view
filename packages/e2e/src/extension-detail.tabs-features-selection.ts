import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.tabs-features-selection'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  await ExtensionDetail.selectFeatures()

  const details = Locator('.ExtensionDetailTab[name="Details"]')
  const features = Locator('.ExtensionDetailTab[name="Features"]')
  const changelog = Locator('.ExtensionDetailTab[name="Changelog"]')
  await expect(details).toHaveAttribute('aria-selected', 'false')
  await expect(features).toHaveAttribute('aria-selected', 'true')
  await expect(changelog).toHaveAttribute('aria-selected', 'false')
}
