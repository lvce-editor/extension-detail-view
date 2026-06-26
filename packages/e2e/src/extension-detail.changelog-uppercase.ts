import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.changelog-uppercase'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  // act
  await ExtensionDetail.selectChangelog()

  // assert
  const tabChangelog = Locator('.ExtensionDetailTab[name="Changelog"]')
  await expect(tabChangelog).toHaveAttribute('aria-selected', 'true')
  const changelog = Locator('.Changelog')
  await expect(changelog).toBeVisible()
  await expect(changelog).toContainText('test changelog')
}
