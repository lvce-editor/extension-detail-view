import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.header-download-title'

export const test = createExtensionDetailTest({
  expectation: { kind: 'attribute', name: 'title', value: 'Downloads: 12,345' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.ExtensionDetailDownloadCount',
})
