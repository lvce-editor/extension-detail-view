import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailButton } from '../GetExtensionDetailButtons/ExtensionDetailButton.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetExtensionDetailHeaderActionsVirtualDom from '../GetExtensionDetailHeaderActionsVirtualDom/GetExtensionDetailHeaderActionsVirtualDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getExtensionDetailHeaderVirtualDom = (extensionDetail: any, extension: any, buttonDefs: readonly ExtensionDetailButton[]): readonly VirtualDomNode[] => {
  const { name, iconSrc, description } = extensionDetail
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeader,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Img,
      className: ClassNames.ExtensionDetailIcon,
      alt: '',
      draggable: false,
      childCount: 0,
      src: iconSrc,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeaderDetails,
      childCount: 3,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailName,
      childCount: 1,
    },
    text(name),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailDescription,
      childCount: 1,
    },
    text(description),
    ...GetExtensionDetailHeaderActionsVirtualDom.getExtensionDetailHeaderActionsVirtualDom(buttonDefs),
  ]
  return dom
}
