import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getExtensionDetailHeaderVirtualDom = (extensionDetail: any): readonly VirtualDomNode[] => {
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
      childCount: 2,
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
  ]
  return dom
}
