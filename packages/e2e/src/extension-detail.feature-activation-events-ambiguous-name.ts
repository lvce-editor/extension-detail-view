import { createActivationEventValidationTest } from '../test/CreateActivationEventValidationTest.ts'

export const name = 'extension-detail.feature-activation-events-ambiguous-name'

export const test = createActivationEventValidationTest({
  index: 9,
  value: 'onraeCompletion:test',
})
