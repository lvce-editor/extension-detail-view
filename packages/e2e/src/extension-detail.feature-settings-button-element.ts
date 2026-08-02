import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-settings-button-element'

export const test = createExtensionDetailTest({
  action: 'Settings',
  expectation: { kind: 'count', value: 1 },
  extensionId: 'test.settings-test',
  extensionUri: import.meta.resolve('../fixtures/extension-settings'),
  selector: 'button.Feature[name="Settings"]',
})
