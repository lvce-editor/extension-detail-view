import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-commands-heading-content'

export const test = createExtensionDetailTest({
  action: 'Commands',
  expectation: { kind: 'text', value: 'Commands' },
  extensionId: 'test.commands-single',
  extensionUri: import.meta.resolve('../fixtures/extension-commands'),
  selector: '.FeatureContent > h1',
})
