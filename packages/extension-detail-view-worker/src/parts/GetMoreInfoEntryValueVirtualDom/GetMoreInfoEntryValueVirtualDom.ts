import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getMoreInfoEntryValueVirtualDom = (item: MoreInfoEntry): readonly VirtualDomNode[] => {
  const { value, onClick } = item
  const valueTag = onClick ? VirtualDomElements.A : VirtualDomElements.Div
  let valueClassName = ClassNames.MoreInfoEntryValue
  if (onClick) {
    valueClassName += ' Link'
  }
  return [
    {
      type: valueTag,
      className: valueClassName,
      childCount: 1,
    },
    text(value),
  ]
}
