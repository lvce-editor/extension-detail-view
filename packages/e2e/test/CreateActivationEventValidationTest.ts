import type { Test } from '@lvce-editor/test-with-playwright'

interface ActivationEventValidationTestOptions {
  readonly index: number
  readonly title?: string
  readonly value: string
}

const extensionId = 'test.activation-events-validation-matrix'
const extensionUri = import.meta.resolve('../fixtures/extension-activation-events-validation-matrix')

export const createActivationEventValidationTest = ({ index, title = '', value }: ActivationEventValidationTestOptions): Test => {
  return async ({ expect, Extension, ExtensionDetail, Locator }) => {
    await Extension.addWebExtension(extensionUri)
    await ExtensionDetail.open(extensionId)
    await ExtensionDetail.selectFeatures()
    await ExtensionDetail.openFeature('ActivationEvents')

    const item = Locator('.FeatureContent li').nth(index)
    await expect(item).toHaveText(value)
    if (title) {
      await expect(item).toHaveClass('ListItemInvalid')
      await expect(item).toHaveAttribute('title', title)
    } else {
      await expect(item).toHaveAttribute('class', null)
      await expect(item).toHaveAttribute('title', null)
    }
  }
}
