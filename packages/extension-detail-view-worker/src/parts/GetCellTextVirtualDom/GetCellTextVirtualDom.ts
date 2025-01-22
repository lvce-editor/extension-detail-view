import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getCellTextVirtualDom = (value: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Td,
      className: 'TableCell',
      childCount: 1,
    },
    text(value),
  ]
}
