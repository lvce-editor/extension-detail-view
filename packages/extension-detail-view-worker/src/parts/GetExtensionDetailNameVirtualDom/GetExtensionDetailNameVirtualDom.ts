import { VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getNameBadgeVirtualDom } from '../GetNameBadgeVirtualDom/GetNameBadgeVirtualDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getExtensionDetailNameVirtualDom = (name: string, badge: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: badge ? 2 : 1,
      className: ClassNames.ExtensionDetailName,
      type: VirtualDomElements.Div,
    },
    text(name),
    ...getNameBadgeVirtualDom(badge),
  ]
}
