import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.header-icon-empty-alt'

export const test = createExtensionDetailTest({
  expectation: { kind: 'attribute', name: 'alt', value: '' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.ExtensionDetailIcon',
})
