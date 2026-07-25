import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-activation-events-code'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  const extensionUri = import.meta.resolve('../fixtures/extension-activation-events')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.activation-events')
  await ExtensionDetail.selectFeatures()

  await ExtensionDetail.openFeature('ActivationEvents')

  const list = Locator('.FeatureContent > ul')
  await expect(list.locator(':scope > li')).toHaveCount(1)
  await expect(list.locator(':scope > li > code')).toHaveText('onWebview:builtin.chat-view')
}
