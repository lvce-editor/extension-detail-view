import { createActivationEventValidationTest } from '../test/CreateActivationEventValidationTest.ts'

export const name = 'extension-detail.feature-activation-events-wildcard'

export const test = createActivationEventValidationTest({
  index: 10,
  value: '*',
})
