import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.details-size-value-link-class'

export const test = createExtensionDetailTest({
  expectation: { kind: 'attribute', name: 'class', value: 'MoreInfoEntryValue Link' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.AdditionalDetailsEntry:nth-of-type(1) .MoreInfoEntry:nth-of-type(4) > .MoreInfoEntryValue',
})
