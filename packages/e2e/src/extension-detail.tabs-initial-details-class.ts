import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.tabs-initial-details-class'

export const test = createExtensionDetailTest({
  expectation: { kind: 'attribute', name: 'class', value: 'ExtensionDetailTab ExtensionDetailTabSelected' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: 'button[name="Details"]',
})
