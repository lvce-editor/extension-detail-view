import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-languages-second-id'

export const test = createExtensionDetailTest({
  action: 'ProgrammingLanguages',
  expectation: { kind: 'text', value: 'nvmrc' },
  extensionId: 'test.programming-languages',
  extensionUri: import.meta.resolve('../fixtures/extension-programming-languages'),
  selector: '.FeatureContent tbody tr:nth-child(2) td:nth-child(1)',
})
