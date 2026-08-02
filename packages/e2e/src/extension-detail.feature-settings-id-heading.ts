import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-settings-id-heading'

export const test = createExtensionDetailTest({
  action: 'Settings',
  expectation: { kind: 'text', value: 'ID' },
  extensionId: 'test.settings-test',
  extensionUri: import.meta.resolve('../fixtures/extension-settings'),
  selector: '.FeatureContent thead th:nth-child(1)',
})
