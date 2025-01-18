import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetMoreInfoEntryVirtualDom from '../GetMoreInfoEntryVirtualDom/GetMoreInfoEntryVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getMoreInfoVirtualDom = (items: readonly MoreInfoEntry[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MoreInfo,
      childCount: items.length,
    },
    ...items.flatMap(GetMoreInfoEntryVirtualDom.getMoreInfoEntryVirtualDom),
  ]
}
