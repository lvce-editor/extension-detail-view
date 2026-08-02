import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-languages-heading-content'

export const test = createExtensionDetailTest({
  action: 'ProgrammingLanguages',
  expectation: { kind: 'text', value: 'Programming Languages' },
  extensionId: 'test.programming-languages',
  extensionUri: import.meta.resolve('../fixtures/extension-programming-languages'),
  selector: '.FeatureContent > h1',
})
