import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.header-icon-draggable-false'

export const test = createExtensionDetailTest({
  expectation: { kind: 'attribute', name: 'draggable', value: 'false' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.ExtensionDetailIcon',
})
