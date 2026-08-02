import { createExtensionDetailTest } from '../test/CreateExtensionDetailTest.ts'

export const name = 'extension-detail.header-rating-accessible-label'

export const test = createExtensionDetailTest({
  expectation: { kind: 'attribute', name: 'aria-label', value: 'Rating: 4.8' },
  extensionId: 'test.extension-basics',
  extensionUri: import.meta.resolve('../fixtures/extension-basics'),
  selector: '.ExtensionDetailRating',
})
