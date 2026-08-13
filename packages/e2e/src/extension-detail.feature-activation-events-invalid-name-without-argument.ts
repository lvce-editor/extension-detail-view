import { createActivationEventValidationTest } from '../test/CreateActivationEventValidationTest.ts'

export const name = 'extension-detail.feature-activation-events-invalid-name-without-argument'

export const test = createActivationEventValidationTest({
  index: 6,
  title: 'Invalid activation event onLangague. Did you mean onLanguage?',
  value: 'onLangague',
})
