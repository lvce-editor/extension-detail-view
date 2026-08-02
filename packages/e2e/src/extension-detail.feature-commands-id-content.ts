import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-commands-id-content'

export const test = createExtensionDetailTest({
  action: 'Commands',
  expectation: { kind: 'text', value: 'test.command' },
  extensionId: 'test.commands-single',
  extensionUri: import.meta.resolve('../fixtures/extension-commands'),
  selector: '.FeatureContent tbody td:nth-child(1)',
})
