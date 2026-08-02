import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-languages-heading-count'

export const test = createExtensionDetailTest({
  action: 'ProgrammingLanguages',
  expectation: { kind: 'count', value: 5 },
  extensionId: 'test.programming-languages',
  extensionUri: import.meta.resolve('../fixtures/extension-programming-languages'),
  selector: '.FeatureContent thead th.TableHeading',
})
