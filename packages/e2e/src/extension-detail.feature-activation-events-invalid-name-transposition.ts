import { createActivationEventValidationTest } from '../test/CreateActivationEventValidationTest.ts'

export const name = 'extension-detail.feature-activation-events-invalid-name-transposition'

export const test = createActivationEventValidationTest({
  index: 3,
  title: 'Invalid activation event onSourceContorl:git. Did you mean onSourceControl:git?',
  value: 'onSourceContorl:git',
})
