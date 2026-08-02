import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.header-name-without-element-children'

export const test = createExtensionDetailTest({
  expectation: { kind: 'count', value: 0 },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.ExtensionDetailName > *',
})
