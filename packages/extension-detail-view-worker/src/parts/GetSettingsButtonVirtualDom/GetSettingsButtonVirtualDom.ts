import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'

export const getSettingsButtonVirtualDom = (enabled: boolean): readonly VirtualDomNode[] => {
  if (!enabled) {
    return []
  }
  return [
    {
      childCount: 1,
      className: ClassNames.SettingsButton,
      name: InputName.Settings,
      onClick: DomEventListenerFunctions.HandleClickSettings,
      title: 'Settings',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: ClassNames.SettingsIcon,
      text: '⚙️',
      type: VirtualDomElements.Span,
    },
  ]
}
