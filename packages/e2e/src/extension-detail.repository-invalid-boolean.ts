import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'extension-detail.repository-invalid-boolean'

export const test: Test = async ({ expect, Extension, ExtensionDetail, Locator }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-repository-invalid-boolean')
  await Extension.addWebExtension(extensionUri)

  // act
  await ExtensionDetail.open('test.extension-repository-invalid-boolean')

  // assert
  const repository = Locator('.ExtensionDetail .AdditionalDetailsEntry').nth(3).locator('.Resource').nth(2)
  await expect(repository).toBeVisible()
  await expect(repository).toHaveText('Repository')
  await expect(repository).toHaveAttribute('href', null)
}
