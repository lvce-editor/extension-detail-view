import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-commands-button-name'

export const test = createExtensionDetailTest({
  action: 'Commands',
  expectation: { kind: 'attribute', name: 'name', value: 'Commands' },
  extensionId: 'test.commands-single',
  extensionUri: import.meta.resolve('../fixtures/extension-commands'),
  selector: '.FeaturesList > button.Feature',
})
