import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-languages-table-element'

export const test = createExtensionDetailTest({
  action: 'ProgrammingLanguages',
  expectation: { kind: 'count', value: 1 },
  extensionId: 'test.programming-languages',
  extensionUri: import.meta.resolve('../fixtures/extension-programming-languages'),
  selector: '.FeatureContent > table.Table',
})
