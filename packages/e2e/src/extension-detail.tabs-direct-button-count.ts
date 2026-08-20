import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.tabs-direct-button-count'

export const test = createExtensionDetailTest({
  expectation: { kind: 'count', value: 4 },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.ExtensionDetailTabs > button.ExtensionDetailTab',
})
