import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getIconDom = (icon: string): readonly VirtualDomNode[] => {
  if (!icon) {
    return []
  }
  return [
    {
      childCount: 1,
      className: ClassNames.ResourceIcon,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: mergeClassNames(ClassNames.MaskIcon, `MaskIcon${icon}`),
      type: VirtualDomElements.Div,
    },
  ]
}
export const getResourceLinkVirtualDom = (resource: Resource): readonly VirtualDomNode[] => {
  const { icon, label, url } = resource
  const iconDom = getIconDom(icon)
  const iconDomCount = iconDom.length > 0 ? 1 : 0
  return [
    {
      childCount: 1 + iconDomCount,
      className: ClassNames.Resource,
      href: url,
      onClick: DomEventListenerFunctions.HandleResourceLinkClick,
      rel: 'noopener noreferrer',
      target: '_blank',
      type: VirtualDomElements.A,
    },
    ...iconDom,
    text(label),
  ]
}
