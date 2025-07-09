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
  const description = Locator('.ExtensionDetailDescription')
  await expect(description).toBeVisible()
  const tabs = Locator('.ExtensionDetailTabs')
  await expect(tabs).toBeVisible()
}
