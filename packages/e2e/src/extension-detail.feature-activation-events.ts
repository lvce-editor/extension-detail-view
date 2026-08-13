import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.feature-activation-events'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-activation-events')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.activation-events')
  await ExtensionDetail.selectFeatures()

  // act
  await ExtensionDetail.openFeature('ActivationEvents')

  // assert
  const heading = Locator('.FeatureContent h1')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveText('Activation Events')
  const list = Locator('.FeatureContent ul')
  await expect(list).toBeVisible()
  const item1 = list.locator('li').nth(0)
  await expect(item1).toHaveText('onWebview:builtin.chat-view')
  await expect(item1).toHaveClass('ListItemInvalid')
  await expect(item1).toHaveAttribute('title', 'Invalid activation event onWebview:builtin.chat-view. Did you mean onWebView:builtin.chat-view?')
}
