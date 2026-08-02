import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.header-metadata-statistic-count'

export const test = createExtensionDetailTest({
  expectation: { kind: 'count', value: 2 },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.ExtensionDetailMetadata > .ExtensionDetailStatistic',
})
