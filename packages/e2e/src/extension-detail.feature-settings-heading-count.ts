import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.feature-settings-heading-count'

export const test = createExtensionDetailTest({
  action: 'Settings',
  expectation: { kind: 'count', value: 2 },
  extensionId: 'test.settings-test',
  extensionUri: import.meta.resolve('../fixtures/extension-settings'),
  selector: '.FeatureContent thead th.TableHeading',
})
