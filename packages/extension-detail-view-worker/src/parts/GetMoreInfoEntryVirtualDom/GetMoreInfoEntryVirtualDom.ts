import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetMoreInfoEntryKeyVirtualDom from '../GetMoreInfoEntryKeyVirtualDom/GetMoreInfoEntryKeyVirtualDom.ts'
import * as GetMoreInfoEntryValueVirtualDom from '../GetMoreInfoEntryValueVirtualDom/GetMoreInfoEntryValueVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const parentNodeEven: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.MoreInfoEntry,
  childCount: 2,
}

const parentNodeOdd: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntry, ClassNames.MoreInfoEntryOdd),
  childCount: 2,
}

export const getMoreInfoEntryVirtualDom = (item: MoreInfoEntry): readonly VirtualDomNode[] => {
  const { odd } = item
  const node = odd ? parentNodeOdd : parentNodeEven
  return [
    node,
    ...GetMoreInfoEntryKeyVirtualDom.getMoreInfoEntryKeyVirtualDom(item),
    ...GetMoreInfoEntryValueVirtualDom.getMoreInfoEntryValueVirtualDom(item),
  ]
}
