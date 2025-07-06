import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getNameBadgeVirtualDom = (badge: string): readonly VirtualDomNode[] => {
  if (!badge) {
    return []
  }
  return [
    {
      type: VirtualDomElements.Span,
      className: ClassNames.ExtensionDetailNameBadge,
      childCount: 1,
    },
    text(badge),
  ]
}
