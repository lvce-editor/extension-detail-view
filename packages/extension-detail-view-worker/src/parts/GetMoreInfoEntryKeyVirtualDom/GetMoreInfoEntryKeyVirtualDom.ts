import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getMoreInfoEntryKeyVirtualDom = (item: MoreInfoEntry): readonly VirtualDomNode[] => {
  const { key } = item
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MoreInfoEntryKey,
      childCount: 1,
    },
    text(key),
  ]
}
