import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-commands-label-without-code'

export const test = createExtensionDetailTest({
  action: 'Commands',
  expectation: { kind: 'count', value: 0 },
  extensionId: 'test.commands-single',
  extensionUri: import.meta.resolve('../fixtures/extension-commands'),
  selector: '.FeatureContent tbody td:nth-child(2) > code',
})
