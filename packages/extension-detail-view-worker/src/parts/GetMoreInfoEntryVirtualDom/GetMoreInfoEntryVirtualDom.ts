import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getMoreInfoEntryVirtualDom = (item: MoreInfoEntry): readonly VirtualDomNode[] => {
  const { key, value } = item
  return [
    {
      type: VirtualDomElements.Div,
      className: 'MoreInfoEntry',
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      childCount: 1,
    },
    text(key),
    {
      type: VirtualDomElements.Div,
      childCount: 1,
    },
    text(value),
  ]
}
