import { createActivationEventValidationTest } from '../test/CreateActivationEventValidationTest.ts'

export const name = 'extension-detail.feature-activation-events-unfamiliar-name'

export const test = createActivationEventValidationTest({
  index: 8,
  value: 'onCustomActivation:test',
})
