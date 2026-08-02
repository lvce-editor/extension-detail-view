import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.header-uninstall-button-content'

export const test = createExtensionDetailTest({
  expectation: { kind: 'text', value: 'Uninstall' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: 'button[name="Uninstall"]',
})
