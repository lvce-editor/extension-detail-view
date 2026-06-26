import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.invalid-contributes-shapes'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const fixtures = [
    ['../fixtures/extension-invalid-contributes-null', 'test.extension-invalid-contributes-null'],
    ['../fixtures/extension-invalid-contributes-array', 'test.extension-invalid-contributes-array'],
    ['../fixtures/extension-invalid-contributes-string', 'test.extension-invalid-contributes-string'],
  ] as const

  for (const [fixture, extensionId] of fixtures) {
    const extensionUri = import.meta.resolve(fixture)
    await Extension.addWebExtension(extensionUri)
    await ExtensionDetail.open(extensionId)

    // assert
    const detailView = Locator('.ExtensionDetail')
    await expect(detailView).toBeVisible()
    const featuresTab = Locator('.ExtensionDetailTab[name="Features"]')
    await expect(featuresTab).toBeHidden()
  }
}
