import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getExtensionDetailIconVirtualDom = (iconSrc: string): VirtualDomNode => {
  return {
    alt: '',
    childCount: 0,
    className: ClassNames.ExtensionDetailIcon,
    draggable: false,
    onContextMenu: DomEventListenerFunctions.HandleImageContextMenu,
    src: iconSrc,
    type: VirtualDomElements.Img,
  }
}
