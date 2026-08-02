import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.header-uninstall-button-class'

export const test = createExtensionDetailTest({
  expectation: { kind: 'attribute', name: 'class', value: 'Button ButtonPrimary' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: 'button[name="Uninstall"]',
})
