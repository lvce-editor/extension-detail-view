import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.details-installation-first-section'

export const test = createExtensionDetailTest({
  expectation: { kind: 'count', value: 1 },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.AdditionalDetails > .AdditionalDetailsEntry:nth-of-type(1)',
})
