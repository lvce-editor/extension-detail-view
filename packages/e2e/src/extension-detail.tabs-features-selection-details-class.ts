import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.tabs-features-selection-details-class'

export const test = createExtensionDetailTest({
  action: 'features',
  expectation: { kind: 'attribute', name: 'class', value: 'ExtensionDetailTab' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: 'button[name="Details"]',
})
