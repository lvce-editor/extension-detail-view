import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-activated-runtime-status'

export const test: Test = async ({ BaseUrl, expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const assetDir = BaseUrl.getBaseUrl()
  const extensionUri = import.meta.resolve('../fixtures/extension-runtime-status')
  await Extension.addWebExtension(extensionUri)
  await Extension.activateByEvent('onCommand:runtimeStatus.activate', assetDir, 2)
  await ExtensionDetail.open('test.runtime-status')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('RuntimeStatus')

  // assert
  const heading = Locator('.FeatureContent h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Runtime Status')
  const definitionList = Locator('.FeatureContent dl')
  await expect(definitionList).toContainText('Status: Activated')
  await expect(definitionList).toContainText('Activation Event: onCommand:runtimeStatus.activate')
  await expect(definitionList).toContainText('Activation Time: ')
}
