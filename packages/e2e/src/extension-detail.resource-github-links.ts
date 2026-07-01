import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.resource-github-links'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-resource-github')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-resource-github')

  // assert
  const resourcesSection = Locator('.ExtensionDetail .AdditionalDetailsEntry').nth(3)
  await expect(resourcesSection).toBeVisible()
  const resources = resourcesSection.locator('.Resource')
  await expect(resources.nth(1)).toHaveText('Issues')
  await expect(resources.nth(1)).toHaveAttribute('href', 'https://github.com/lvce-editor/extension-detail-view/issues')
  await expect(resources.nth(2)).toHaveText('Repository')
  await expect(resources.nth(2)).toHaveAttribute('href', 'https://github.com/lvce-editor/extension-detail-view')
  await expect(resources.nth(3)).toHaveText('License')
  await expect(resources.nth(3)).toHaveAttribute('href', 'https://github.com/lvce-editor/extension-detail-view/blob/main/LICENSE')
  await expect(resources.nth(3)).toHaveAttribute('target', '_blank')
  await expect(resources.nth(3)).toHaveAttribute('rel', 'noopener noreferrer')
}
