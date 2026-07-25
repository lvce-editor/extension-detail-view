import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.tabs-changelog-selection'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  await ExtensionDetail.selectChangelog()

  const details = Locator('.ExtensionDetailTab[name="Details"]')
  const features = Locator('.ExtensionDetailTab[name="Features"]')
  const changelog = Locator('.ExtensionDetailTab[name="Changelog"]')
  await expect(details).toHaveAttribute('aria-selected', 'false')
  await expect(features).toHaveAttribute('aria-selected', 'false')
  await expect(changelog).toHaveAttribute('aria-selected', 'true')
}
