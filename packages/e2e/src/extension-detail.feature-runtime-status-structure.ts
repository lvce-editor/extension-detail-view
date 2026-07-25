import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-runtime-status-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-runtime-status')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.runtime-status')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('RuntimeStatus')

  const definitionList = Locator('.FeatureContent > dl.RuntimeStatusDefinitionList')
  const statusTerm = definitionList.locator('dt').nth(0)
  const statusValue = definitionList.locator('dd').nth(0)
  await expect(definitionList).toBeVisible()
  await expect(statusTerm).toContainText('Status:')
  await expect(statusValue).toBeVisible()
}
