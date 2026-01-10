import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getNameBadgeVirtualDom } from '../GetNameBadgeVirtualDom/GetNameBadgeVirtualDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getExtensionDetailNameWithBadgeVirtualDom = (name: string, badge: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: ClassNames.ExtensionDetailName,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Span,
    },
    text(name),
    ...getNameBadgeVirtualDom(badge),
  ]
}

export const getExtensionDetailNameDefaultVirtualDom = (name: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailName,
      type: VirtualDomElements.Div,
    },
    text(name),
  ]
}

export const getExtensionDetailNameVirtualDom = (name: string, badge: string): readonly VirtualDomNode[] => {
  if (badge) {
    return getExtensionDetailNameWithBadgeVirtualDom(name, badge)
  }
  return getExtensionDetailNameDefaultVirtualDom(name)
}
