import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ expect, ExtensionDetail, Locator }) => {
  // act
  await ExtensionDetail.open('builtin.theme-cobalt2')

  // assert
  const readme = Locator('.Markdown')
  await expect(readme).toBeVisible()
  await expect(readme).toContainText('Theme Cobalt2')
}
