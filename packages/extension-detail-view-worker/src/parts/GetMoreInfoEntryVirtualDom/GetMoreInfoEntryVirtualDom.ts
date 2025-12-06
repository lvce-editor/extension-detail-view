import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetMoreInfoEntryKeyVirtualDom from '../GetMoreInfoEntryKeyVirtualDom/GetMoreInfoEntryKeyVirtualDom.ts'
import * as GetMoreInfoEntryValueVirtualDom from '../GetMoreInfoEntryValueVirtualDom/GetMoreInfoEntryValueVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const parentNodeEven: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.MoreInfoEntry,
  type: VirtualDomElements.Div,
}

const parentNodeOdd: VirtualDomNode = {
  childCount: 2,
  className: MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntry, ClassNames.MoreInfoEntryOdd),
  type: VirtualDomElements.Div,
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
