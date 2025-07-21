import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getExtensionDetailIconVirtualDom = (iconSrc: string): VirtualDomNode => {
  return {
    type: VirtualDomElements.Img,
    className: ClassNames.ExtensionDetailIcon,
    alt: '',
    childCount: 0,
    draggable: false,
    onClick: DomEventListenerFunctions.HandleImageContextMenu,
    src: iconSrc,
  }
}
