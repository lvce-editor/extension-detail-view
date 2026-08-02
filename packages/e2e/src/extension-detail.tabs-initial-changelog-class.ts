import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.tabs-initial-changelog-class'

export const test = createExtensionDetailTest({
  expectation: { kind: 'attribute', name: 'class', value: 'ExtensionDetailTab' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: 'button[name="Changelog"]',
})
