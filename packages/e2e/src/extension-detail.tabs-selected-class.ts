import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.tabs-selected-class'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  await ExtensionDetail.selectFeatures()

  const details = Locator('.ExtensionDetailTab[name="Details"]')
  const features = Locator('.ExtensionDetailTab[name="Features"]')
  const changelog = Locator('.ExtensionDetailTab[name="Changelog"]')
  await expect(details).toHaveAttribute('class', 'ExtensionDetailTab')
  await expect(features).toHaveAttribute('class', 'ExtensionDetailTab ExtensionDetailTabSelected')
  await expect(changelog).toHaveAttribute('class', 'ExtensionDetailTab')
}
