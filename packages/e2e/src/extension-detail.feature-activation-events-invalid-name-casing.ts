import { createActivationEventValidationTest } from '../test/CreateActivationEventValidationTest.ts'

export const name = 'extension-detail.feature-activation-events-invalid-name-casing'

export const test = createActivationEventValidationTest({
  index: 4,
  title: 'Invalid activation event onStatusbarItem:sample.status. Did you mean onStatusBarItem:sample.status?',
  value: 'onStatusbarItem:sample.status',
})
