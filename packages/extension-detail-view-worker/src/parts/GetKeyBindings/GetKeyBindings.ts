import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'

const focusId = 451

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      command: 'ExtensionDetail.focusNextTab',
      key: KeyCode.RightArrow,
      when: focusId,
    },
    {
      command: 'ExtensionDetail.focusPreviousTab',
      key: KeyCode.LeftArrow,
      when: focusId,
    },
  ]
}
