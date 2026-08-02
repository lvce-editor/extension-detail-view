import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.header-description-content'

export const test = createExtensionDetailTest({
  expectation: { kind: 'text', value: 'Test Description' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.ExtensionDetailDescription',
})
