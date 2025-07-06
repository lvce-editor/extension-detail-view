import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailButton } from '../GetExtensionDetailButtons/ExtensionDetailButton.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetButtonVirtualDom from '../GetButtonVirtualDom/GetButtonVirtualDom.ts'
import { getExtensionDetailButtons } from '../GetExtensionDetailButtons/GetExtensionDetailButtons.ts'

export const getExtensionDetailHeaderActionsVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  const buttonDefs = getExtensionDetailButtons(extension)
  const buttons: VirtualDomNode[] = buttonDefs.flatMap((btn: ExtensionDetailButton) =>
    GetButtonVirtualDom.getButtonVirtualDom(btn.label, btn.onClick)
  )
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
