import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getCellCodeVirtualDom = (value: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Td,
      className: 'TableCell',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div, // TODO use code tag
      childCount: 1,
    },
    text(value),
  ]
}
