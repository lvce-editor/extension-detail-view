import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.resource-icons'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-resource-github')
  await Extension.addWebExtension(extensionUri)

  await ExtensionDetail.open('test.extension-resource-github')

  const links = Locator('.Resources > a.Resource')
  const issuesIcon = links.nth(0).locator('.MaskIconLinkExternal')
  const repositoryIcon = links.nth(1).locator('.MaskIconRepo')
  const licenseIcon = links.nth(2).locator('.MaskIconLinkExternal')
  await expect(links).toHaveCount(3)
  await expect(issuesIcon).toHaveCount(1)
  await expect(repositoryIcon).toHaveCount(1)
  await expect(licenseIcon).toHaveCount(1)
}
