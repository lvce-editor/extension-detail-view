import { createActivationEventValidationTest } from '../test/CreateActivationEventValidationTest.ts'

export const name = 'extension-detail.feature-activation-events-invalid-name-command-argument'

export const test = createActivationEventValidationTest({
  index: 5,
  title: 'Invalid activation event onComand:workbench.action.openFile. Did you mean onCommand:workbench.action.openFile?',
  value: 'onComand:workbench.action.openFile',
})
