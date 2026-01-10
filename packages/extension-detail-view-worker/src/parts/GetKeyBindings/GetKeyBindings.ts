import { WhenExpression } from '@lvce-editor/constants'
import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      command: 'ExtensionDetail.focusNextTab',
      key: KeyCode.RightArrow,
      when: WhenExpression.FocusExtensioNDetailTabs,
    },
    {
      command: 'ExtensionDetail.focusPreviousTab',
      key: KeyCode.LeftArrow,
      when: WhenExpression.FocusExtensioNDetailTabs,
    },
  ]
}
