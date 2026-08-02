import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-commands-label-heading'

export const test = createExtensionDetailTest({
  action: 'Commands',
  expectation: { kind: 'text', value: 'Label' },
  extensionId: 'test.commands-single',
  extensionUri: import.meta.resolve('../fixtures/extension-commands'),
  selector: '.FeatureContent thead th:nth-child(2)',
})
