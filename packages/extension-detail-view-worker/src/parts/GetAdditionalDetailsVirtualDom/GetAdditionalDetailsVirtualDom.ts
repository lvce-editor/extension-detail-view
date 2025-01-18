import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetMoreInfoVirtualDom from '../GetMoreInfoVirtualDom/GetMoreInfoVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getAdditionalDetailsVirtualDom = (entries: readonly MoreInfoEntry[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: 'AdditionalDetails',
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: 'AdditionalDetailsTitle',
      childCount: 1,
    },
    text('Installation'),
    ...GetMoreInfoVirtualDom.getMoreInfoVirtualDom(entries),
  ]
}
