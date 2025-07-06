import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getSettingsButtonVirtualDom = (enabled: boolean): readonly VirtualDomNode[] => {
  if (!enabled) {
    return []
  }
  return [
    {
      type: VirtualDomElements.Button,
      className: ClassNames.SettingsButton,
      onClick: DomEventListenerFunctions.HandleClickSettings,
      childCount: 1,
      title: 'Settings',
    },
    {
      type: VirtualDomElements.Span,
      className: ClassNames.SettingsIcon,
      childCount: 0,
      text: '⚙️',
    },
  ]
}
