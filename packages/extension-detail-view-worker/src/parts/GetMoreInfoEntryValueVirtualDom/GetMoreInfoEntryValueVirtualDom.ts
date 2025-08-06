import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { getMoreInfoEntryValueClassName } from '../GetMoreInfoEntryValueClassName/GetMoreInfoEntryValueClassName.ts'
import { getMoreInfoEntryValueTag } from '../GetMoreInfoEntryValueTag/GetMoreInfoEntryValueTag.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getMoreInfoEntryValueVirtualDom = (item: MoreInfoEntry): readonly VirtualDomNode[] => {
  const { value, onClick, code, title } = item
  const type = getMoreInfoEntryValueTag(onClick, code)
  const className = getMoreInfoEntryValueClassName(onClick, code)
  return [
    {
      type,
      className,
      childCount: 1,
      onClick,
      title,
    },
    text(value),
  ]
}
