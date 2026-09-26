import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-commands-list-role'

export const test = createExtensionDetailTest({
  action: 'Commands',
  expectation: { kind: 'attribute', name: 'role', value: 'tablist' },
  extensionId: 'test.commands-single',
  extensionUri: import.meta.resolve('../fixtures/extension-commands'),
  selector: '.FeaturesList',
})
