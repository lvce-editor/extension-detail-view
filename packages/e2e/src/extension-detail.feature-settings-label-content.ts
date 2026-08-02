import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-settings-label-content'

export const test = createExtensionDetailTest({
  action: 'Settings',
  expectation: { kind: 'text', value: 'Test' },
  extensionId: 'test.settings-test',
  extensionUri: import.meta.resolve('../fixtures/extension-settings'),
  selector: '.FeatureContent tbody td:nth-child(2)',
})
