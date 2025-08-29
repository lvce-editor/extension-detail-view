import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetMoreInfoEntryValueClassName from '../GetMoreInfoEntryValueClassName/GetMoreInfoEntryValueClassName.ts'
import * as GetMoreInfoEntryValueTag from '../GetMoreInfoEntryValueTag/GetMoreInfoEntryValueTag.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getMoreInfoEntryValueVirtualDom = (item: MoreInfoEntry): readonly VirtualDomNode[] => {
  const { value, onClick, code, title } = item
  const type = GetMoreInfoEntryValueTag.getMoreInfoEntryValueTag(onClick, code)
  const className = GetMoreInfoEntryValueClassName.getMoreInfoEntryValueClassName(onClick, code)
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
