import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.header-metadata-direct-child'

export const test = createExtensionDetailTest({
  expectation: { kind: 'count', value: 1 },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.ExtensionDetailHeaderDetails > .ExtensionDetailMetadata',
})
