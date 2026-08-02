import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-commands-heading-count'

export const test = createExtensionDetailTest({
  action: 'Commands',
  expectation: { kind: 'count', value: 2 },
  extensionId: 'test.commands-single',
  extensionUri: import.meta.resolve('../fixtures/extension-commands'),
  selector: '.FeatureContent thead th.TableHeading',
})
