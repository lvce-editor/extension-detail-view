import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.tabs-features-panel-element'

export const test = createExtensionDetailTest({
  action: 'features',
  expectation: { kind: 'count', value: 1 },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.ExtensionDetail > div.Features',
})
