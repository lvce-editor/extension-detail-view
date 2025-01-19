import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getAdditionalDetailsEntryVirtualDom = <T>(
  heading: string,
  items: readonly T[],
  renderer: (items: readonly T[]) => readonly VirtualDomNode[],
): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.AdditionalDetailsEntry,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.AdditionalDetailsTitle,
      childCount: 1,
    },
    text(heading),
    ...renderer(items),
  ]
}
