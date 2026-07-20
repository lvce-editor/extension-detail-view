import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const additionalDetailsEntryNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.AdditionalDetailsEntry,
  type: VirtualDomElements.Div,
}

const additionalDetailsTitleNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.AdditionalDetailsTitle,
  type: VirtualDomElements.Div,
}

export const getAdditionalDetailsEntryVirtualDom = <T>(
  heading: string,
  items: readonly T[],
  renderer: (items: readonly T[]) => readonly VirtualDomNode[],
): readonly VirtualDomNode[] => {
  return [additionalDetailsEntryNode, additionalDetailsTitleNode, text(heading), ...renderer(items)]
}
