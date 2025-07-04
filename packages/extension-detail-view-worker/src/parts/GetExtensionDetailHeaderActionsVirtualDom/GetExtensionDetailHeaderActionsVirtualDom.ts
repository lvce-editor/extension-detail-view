import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetButtonVirtualDom from '../GetButtonVirtualDom/GetButtonVirtualDom.ts'

export const getExtensionDetailHeaderActionsVirtualDom = (): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeaderActions,
      childCount: 2,
    },
    ...GetButtonVirtualDom.getButtonVirtualDom('Disable', DomEventListenerFunctions.HandleClickDisable),
    ...GetButtonVirtualDom.getButtonVirtualDom('Uninstall', DomEventListenerFunctions.HandleClickUninstall),
  ]
  return dom
}
