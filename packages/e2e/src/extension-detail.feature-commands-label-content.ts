import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-commands-label-content'

export const test = createExtensionDetailTest({
  action: 'Commands',
  expectation: { kind: 'text', value: 'Test' },
  extensionId: 'test.commands-single',
  extensionUri: import.meta.resolve('../fixtures/extension-commands'),
  selector: '.FeatureContent tbody td:nth-child(2)',
})
