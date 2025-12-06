import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const parentNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.MoreInfoEntryKey,
  type: VirtualDomElements.Dt,
}

export const getMoreInfoEntryKeyVirtualDom = (item: MoreInfoEntry): readonly VirtualDomNode[] => {
  const { key } = item
  return [parentNode, text(key)]
}
