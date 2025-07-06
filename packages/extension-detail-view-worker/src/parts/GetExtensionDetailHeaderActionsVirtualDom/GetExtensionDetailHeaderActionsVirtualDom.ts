import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailButton } from '../GetExtensionDetailButtons/ExtensionDetailButton.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetButtonVirtualDom from '../GetButtonVirtualDom/GetButtonVirtualDom.ts'

export const getExtensionDetailHeaderActionsVirtualDom = (buttonDefs: readonly ExtensionDetailButton[]): readonly VirtualDomNode[] => {
  const buttons: VirtualDomNode[] = buttonDefs.flatMap((btn: ExtensionDetailButton) =>
    GetButtonVirtualDom.getButtonVirtualDom(btn.label, btn.onClick),
  )
  const dom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeaderActions,
      childCount: buttonDefs.length,
    },
    ...buttons,
  ]
  return dom
}
