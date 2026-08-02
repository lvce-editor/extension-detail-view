import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.tabs-list-role'

export const test = createExtensionDetailTest({
  expectation: { kind: 'attribute', name: 'role', value: 'tablist' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.ExtensionDetailTabs',
})
