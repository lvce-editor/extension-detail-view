import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.header-settings-button-element'

export const test = createExtensionDetailTest({
  expectation: { kind: 'count', value: 1 },
  extensionId: 'test.extension-settings-menu',
  extensionUri: import.meta.resolve('../fixtures/extension-settings-menu'),
  selector: 'button.SettingsButton[name="Settings"]',
})
