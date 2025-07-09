import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ Main, Locator, expect, Extension }) => {
  // arrange
  const uri = new URL('../fixtures/sample.extension-basics', import.meta.url).toString()
  await Extension.addWebExtension(uri)

  // act
  await Main.openUri('extension-detail://builtin.extension-basics')

  // assert
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const icon = Locator('.ExtensionDetailIcon')
  await expect(icon).toBeVisible()
  const name = Locator('.ExtensionDetailName')
  await expect(name).toBeVisible()
  await expect(name).toHaveText('Test')
  const description = Locator('.ExtensionDetailDescription')
  await expect(description).toBeVisible()
  await expect(description).toHaveText('Test Description')
  const disableButton = Locator('[name="Disable"]')
  await expect(disableButton).toBeVisible()
  const uninstallButton = Locator('[name="Uninstall"]')
  await expect(uninstallButton).toBeVisible()
  const tabs = Locator('.ExtensionDetailTabs')
  await expect(tabs).toBeVisible()
  const tab1 = Locator('.ExtensionDetailTab').nth(0)
  await expect(tab1).toHaveText('Details')
  const tab2 = Locator('.ExtensionDetailTab').nth(1)
  await expect(tab2).toHaveText('Features')
  const tab3 = Locator('.ExtensionDetailTab').nth(2)
  await expect(tab3).toHaveText('Changelog')
}
