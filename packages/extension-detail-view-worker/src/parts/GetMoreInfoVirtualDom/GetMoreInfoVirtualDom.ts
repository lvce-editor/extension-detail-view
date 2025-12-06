import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetMoreInfoEntryVirtualDom from '../GetMoreInfoEntryVirtualDom/GetMoreInfoEntryVirtualDom.ts'

export const getMoreInfoVirtualDom = (items: readonly MoreInfoEntry[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: items.length,
      className: ClassNames.MoreInfo,
      type: VirtualDomElements.Dl,
    },
    ...items.flatMap(GetMoreInfoEntryVirtualDom.getMoreInfoEntryVirtualDom),
  ]
}
