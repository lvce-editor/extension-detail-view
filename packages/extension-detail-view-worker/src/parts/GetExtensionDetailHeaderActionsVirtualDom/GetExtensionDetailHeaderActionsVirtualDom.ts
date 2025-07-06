import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetButtonVirtualDom from '../GetButtonVirtualDom/GetButtonVirtualDom.ts'
import * as HasColorThemes from '../HasColorThemes/HasColorThemes.ts'

export const getExtensionDetailHeaderActionsVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  const buttons: VirtualDomNode[] = [
    ...GetButtonVirtualDom.getButtonVirtualDom('Disable', DomEventListenerFunctions.HandleClickDisable),
    ...GetButtonVirtualDom.getButtonVirtualDom('Uninstall', DomEventListenerFunctions.HandleClickUninstall),
  ]

  if (HasColorThemes.hasColorThemes(extension)) {
    buttons.push(...GetButtonVirtualDom.getButtonVirtualDom('Set Color Theme', DomEventListenerFunctions.HandleClickSetColorTheme))
  }

  const dom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeaderActions,
      childCount: buttons.length / 2,
    },
    ...buttons,
  ]
  return dom
}
