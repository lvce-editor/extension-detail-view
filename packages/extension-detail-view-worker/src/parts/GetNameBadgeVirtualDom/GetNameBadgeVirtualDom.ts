import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const nameBadgeNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.ExtensionDetailNameBadge,
  type: VirtualDomElements.Span,
}

export const getNameBadgeVirtualDom = (badge: string): readonly VirtualDomNode[] => {
  if (!badge) {
    return []
  }
  return [nameBadgeNode, text(badge)]
}
