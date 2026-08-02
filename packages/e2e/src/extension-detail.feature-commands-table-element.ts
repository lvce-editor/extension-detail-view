import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-commands-table-element'

export const test = createExtensionDetailTest({
  action: 'Commands',
  expectation: { kind: 'count', value: 1 },
  extensionId: 'test.commands-single',
  extensionUri: import.meta.resolve('../fixtures/extension-commands'),
  selector: '.FeatureContent > table.Table',
})
