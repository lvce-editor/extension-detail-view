import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.details-identifier-value-content'

export const test = createExtensionDetailTest({
  expectation: { kind: 'text', value: 'test.extension-basics' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.AdditionalDetailsEntry:nth-of-type(1) .MoreInfoEntry:nth-of-type(1) > .MoreInfoEntryValue',
})
