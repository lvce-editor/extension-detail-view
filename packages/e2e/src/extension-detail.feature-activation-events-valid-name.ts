import { createActivationEventValidationTest } from '../test/CreateActivationEventValidationTest.ts'

export const name = 'extension-detail.feature-activation-events-valid-name'

export const test = createActivationEventValidationTest({
  index: 11,
  value: 'onLanguage:typescript',
})
