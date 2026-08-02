import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.details-markdown-heading-content'

export const test = createExtensionDetailTest({
  expectation: { kind: 'text', value: 'test readme' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.Markdown > h1',
})
