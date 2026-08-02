import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-settings-heading-content'

export const test = createExtensionDetailTest({
  action: 'Settings',
  expectation: { kind: 'text', value: 'Settings' },
  extensionId: 'test.settings-test',
  extensionUri: import.meta.resolve('../fixtures/extension-settings'),
  selector: '.FeatureContent > h1',
})
