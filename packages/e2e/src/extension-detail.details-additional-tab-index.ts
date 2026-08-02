import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.details-additional-tab-index'

export const test = createExtensionDetailTest({
  expectation: { kind: 'attribute', name: 'tabindex', value: '0' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.AdditionalDetails',
})
