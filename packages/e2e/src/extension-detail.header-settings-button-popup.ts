import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.header-settings-button-popup'

export const test = createExtensionDetailTest({
  expectation: { kind: 'attribute', name: 'aria-haspopup', value: 'menu' },
  extensionId: 'test.extension-settings-menu',
  extensionUri: import.meta.resolve('../fixtures/extension-settings-menu'),
  selector: 'button.SettingsButton',
})
