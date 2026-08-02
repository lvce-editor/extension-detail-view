import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.tabs-features-hide-details-panel'

export const test = createExtensionDetailTest({
  action: 'features',
  expectation: { kind: 'count', value: 0 },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.ExtensionDetailPanel',
})
