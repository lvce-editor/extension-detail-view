import { createActivationEventValidationTest } from '../test/CreateActivationEventValidationTest.ts'

export const name = 'extension-detail.feature-activation-events-invalid-name-deletion'

export const test = createActivationEventValidationTest({
  index: 0,
  title: 'Invalid activation event onLangage:typescript. Did you mean onLanguage:typescript?',
  value: 'onLangage:typescript',
})
