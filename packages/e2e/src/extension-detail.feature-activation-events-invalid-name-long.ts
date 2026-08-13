import { createActivationEventValidationTest } from '../test/CreateActivationEventValidationTest.ts'

export const name = 'extension-detail.feature-activation-events-invalid-name-long'

export const test = createActivationEventValidationTest({
  index: 7,
  title: 'Invalid activation event onStartupFinised. Did you mean onStartupFinished?',
  value: 'onStartupFinised',
})
