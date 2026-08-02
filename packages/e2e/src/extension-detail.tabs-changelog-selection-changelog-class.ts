import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.tabs-changelog-selection-changelog-class'

export const test = createExtensionDetailTest({
  action: 'changelog',
  expectation: { kind: 'attribute', name: 'class', value: 'ExtensionDetailTab ExtensionDetailTabSelected' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: 'button[name="Changelog"]',
})
