import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetMoreInfoEntryKeyVirtualDom from '../GetMoreInfoEntryKeyVirtualDom/GetMoreInfoEntryKeyVirtualDom.ts'
import * as GetMoreInfoEntryValueVirtualDom from '../GetMoreInfoEntryValueVirtualDom/GetMoreInfoEntryValueVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getMoreInfoEntryVirtualDom = (item: MoreInfoEntry): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MoreInfoEntry,
      childCount: 2,
    },
    ...GetMoreInfoEntryKeyVirtualDom.getMoreInfoEntryKeyVirtualDom(item),
    ...GetMoreInfoEntryValueVirtualDom.getMoreInfoEntryValueVirtualDom(item),
  ]
}
