import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.invalid-feature-shapes'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-invalid-feature-shapes')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-invalid-feature-shapes')

  // assert
  const detailView = Locator('.ExtensionDetail')
  await expect(detailView).toBeVisible()
  const featuresTab = Locator('.ExtensionDetailTab[name="Features"]')
  await expect(featuresTab).toBeHidden()
}
