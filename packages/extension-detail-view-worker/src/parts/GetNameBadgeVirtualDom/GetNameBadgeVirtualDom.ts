import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getNameBadgeVirtualDom = (badge: string): readonly VirtualDomNode[] => {
  if (!badge) {
    return []
  }
  return [
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailNameBadge,
      type: VirtualDomElements.Span,
    },
    text(badge),
  ]
}
