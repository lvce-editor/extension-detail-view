import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-languages-first-id'

export const test = createExtensionDetailTest({
  action: 'ProgrammingLanguages',
  expectation: { kind: 'text', value: 'css' },
  extensionId: 'test.programming-languages',
  extensionUri: import.meta.resolve('../fixtures/extension-programming-languages'),
  selector: '.FeatureContent tbody tr:nth-child(1) td:nth-child(1)',
})
