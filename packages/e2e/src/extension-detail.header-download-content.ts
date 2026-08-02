import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.header-download-content'

export const test = createExtensionDetailTest({
  expectation: { kind: 'text', value: '12,345' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.ExtensionDetailDownloadCount',
})
