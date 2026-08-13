import { createActivationEventValidationTest } from '../test/CreateActivationEventValidationTest.ts'

export const name = 'extension-detail.feature-activation-events-invalid-name-substitution'

export const test = createActivationEventValidationTest({
  index: 2,
  title: 'Invalid activation event onCommend:workbench.action.save. Did you mean onCommand:workbench.action.save?',
  value: 'onCommend:workbench.action.save',
})
