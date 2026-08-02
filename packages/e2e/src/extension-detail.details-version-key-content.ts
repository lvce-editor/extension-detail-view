import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.details-version-key-content'

export const test = createExtensionDetailTest({
  expectation: { kind: 'text', value: 'Version' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.AdditionalDetailsEntry:nth-of-type(1) .MoreInfoEntry:nth-of-type(2) > .MoreInfoEntryKey',
})
