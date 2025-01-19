import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getCellCodeVirtualDom = (value: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Td,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Code,
      childCount: 1,
    },
    text(value),
  ]
}
