import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getIconDom = (icon: string): readonly VirtualDomNode[] => {
  if (!icon) {
    return []
  }
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ResourceIcon,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: mergeClassNames(ClassNames.MaskIcon, `MaskIcon${icon}`),
      childCount: 0,
    },
  ]
}
export const getResourceLinkVirtualDom = (resource: Resource): readonly VirtualDomNode[] => {
  const { label, url, icon } = resource
  const iconDom = getIconDom(icon)
  const iconDomCount = iconDom.length > 0 ? 1 : 0
  return [
    {
      type: VirtualDomElements.A,
      className: ClassNames.Resource,
      childCount: 1 + iconDomCount,
      target: '_blank',
      rel: 'noopener noreferrer',
      href: url,
    },
    ...iconDom,
    text(label),
  ]
}
