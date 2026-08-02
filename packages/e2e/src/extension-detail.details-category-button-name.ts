import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.details-category-button-name'

export const test = createExtensionDetailTest({
  expectation: { kind: 'attribute', name: 'name', value: 'themes' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.AdditionalDetailsEntry:nth-of-type(3) button.Category',
})
