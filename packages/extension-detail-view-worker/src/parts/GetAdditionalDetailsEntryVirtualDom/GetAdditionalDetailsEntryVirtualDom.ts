import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getAdditionalDetailsEntryVirtualDom = <T>(
  heading: string,
  items: readonly T[],
  renderer: (items: readonly T[]) => readonly VirtualDomNode[],
): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 2,
      className: ClassNames.AdditionalDetailsEntry,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.AdditionalDetailsTitle,
      type: VirtualDomElements.Div,
    },
    text(heading),
    ...renderer(items),
  ]
}
