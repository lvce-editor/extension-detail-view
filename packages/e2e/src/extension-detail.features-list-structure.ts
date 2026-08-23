import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.features-list-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-basics')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-basics')

  await ExtensionDetail.selectFeatures()

  const features = Locator('.FeaturesList')
  await expect(features).toHaveAttribute('role', 'none')
  const featureButtons = features.locator('button.Feature')
  await expect(featureButtons).toHaveCount(2)
  const commandsButton = featureButtons.nth(0)
  const securityButton = featureButtons.nth(1)
  await expect(commandsButton).toHaveAttribute('name', 'Commands')
  await expect(commandsButton).toHaveText('Commands')
  await expect(securityButton).toHaveAttribute('name', 'Security')
  await expect(securityButton).toHaveText('Security')
}
