import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getNameBadgeVirtualDom } from '../GetNameBadgeVirtualDom/GetNameBadgeVirtualDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getExtensionDetailNameVirtualDom = (name: string, badge: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailName,
      childCount: badge ? 2 : 1,
    },
    text(name),
    ...getNameBadgeVirtualDom(badge),
  ]
}
