import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-runtime-status-structure'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-runtime-status')
  await Extension.addWebExtension(extensionUri)
  await Extension.activateByEvent('onCommand:runtimeStatus.activate', '', 2)
  await ExtensionDetail.open('test.runtime-status')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('RuntimeStatus')

  const definitionList = Locator('.FeatureContent > dl.RuntimeStatusDefinitionList')
  await expect(definitionList).toBeVisible()
  await expect(definitionList.locator('dt')).toHaveCount(4)
  await expect(definitionList.locator('dd')).toHaveCount(4)
  await expect(definitionList.locator('dd code')).toHaveText('onCommand:runtimeStatus.activate')
}
