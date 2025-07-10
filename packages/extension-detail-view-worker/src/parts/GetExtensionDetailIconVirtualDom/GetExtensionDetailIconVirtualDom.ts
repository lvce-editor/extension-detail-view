import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'

export const getExtensionDetailIconVirtualDom = (iconSrc: string): VirtualDomNode => {
  return {
    type: VirtualDomElements.Img,
    className: ClassNames.ExtensionDetailIcon,
    alt: '',
    draggable: false,
    childCount: 0,
    src: iconSrc,
  }
}
