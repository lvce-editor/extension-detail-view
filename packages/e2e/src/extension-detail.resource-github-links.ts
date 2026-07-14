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
  const issues = resources.nth(1)
  const repository = resources.nth(2)
  const license = resources.nth(3)
  await expect(issues).toHaveText('Issues')
  await expect(issues).toHaveAttribute('href', 'https://github.com/lvce-editor/extension-detail-view/issues')
  await expect(repository).toHaveText('Repository')
  await expect(repository).toHaveAttribute('href', 'https://github.com/lvce-editor/extension-detail-view')
  await expect(license).toHaveText('License')
  await expect(license).toHaveAttribute('href', 'https://github.com/lvce-editor/extension-detail-view/blob/main/LICENSE')
  await expect(license).toHaveAttribute('target', '_blank')
  await expect(license).toHaveAttribute('rel', 'noopener noreferrer')
}
