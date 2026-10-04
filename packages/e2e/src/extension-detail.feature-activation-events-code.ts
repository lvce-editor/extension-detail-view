import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-activation-events-code'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-activation-events')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.activation-events')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('ActivationEvents')

  // assert
  const list = Locator('.FeatureContent > ul')
  const locatorLocator = list.locator(':scope > li')
  await expect(locatorLocator).toHaveCount(1)
  const locatorLocator2 = list.locator(':scope > li > code')
  await expect(locatorLocator2).toHaveText('onWebview:builtin.chat-view')
}
