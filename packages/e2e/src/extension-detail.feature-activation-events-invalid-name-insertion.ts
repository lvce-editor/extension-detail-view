import { createActivationEventValidationTest } from '../test/CreateActivationEventValidationTest.ts'

export const name = 'extension-detail.feature-activation-events-invalid-name-insertion'

export const test = createActivationEventValidationTest({
  index: 1,
  title: 'Invalid activation event onLanguuage:javascript. Did you mean onLanguage:javascript?',
  value: 'onLanguuage:javascript',
})
