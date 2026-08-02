import type { LocatorExpect, Test, TestApi } from '@lvce-editor/test-with-playwright'

type Action = 'changelog' | 'features' | 'none' | 'Commands' | 'ProgrammingLanguages' | 'Settings'

type Expectation =
  | { readonly kind: 'attribute'; readonly name: string; readonly value: string | null }
  | { readonly kind: 'count'; readonly value: number }
  | { readonly kind: 'text'; readonly value: string }

interface ExtensionDetailTestOptions {
  readonly action?: Action
  readonly expectation: Expectation
  readonly extensionId: string
  readonly extensionUri: string
  readonly selector: string
}

const applyExpectation = async (expectation: LocatorExpect, expected: Expectation): Promise<void> => {
  switch (expected.kind) {
    case 'attribute':
      await expectation.toHaveAttribute(expected.name, expected.value)
      break
    case 'count':
      await expectation.toHaveCount(expected.value)
      break
    case 'text':
      await expectation.toHaveText(expected.value)
      break
  }
}

const prepareView = async (api: TestApi, action: Action): Promise<void> => {
  if (action === 'features') {
    await api.ExtensionDetail.selectFeatures()
    return
  }
  if (action === 'changelog') {
    await api.ExtensionDetail.selectChangelog()
    return
  }
  if (action !== 'none') {
    await api.ExtensionDetail.selectFeatures()
    await api.ExtensionDetail.openFeature(action)
  }
}

export const createExtensionDetailTest = ({
  action = 'none',
  expectation,
  extensionId,
  extensionUri,
  selector,
}: ExtensionDetailTestOptions): Test => {
  return async (api) => {
    await api.Extension.addWebExtension(extensionUri)
    await api.ExtensionDetail.open(extensionId)
    await prepareView(api, action)

    const locator = api.Locator(selector)
    await applyExpectation(api.expect(locator), expectation)
  }
}
