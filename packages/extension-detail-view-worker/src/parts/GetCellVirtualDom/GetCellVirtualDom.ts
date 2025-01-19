import type { Cell } from '../Cell/Cell.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

const getCellTextVirtualDom = (value: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Td,
      childCount: 1,
    },
    text(value),
  ]
}

const getCellCodeVirtualDom = (value: string): readonly VirtualDomNode[] => {
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

export const getCellVirtualDom = (entry: Cell): readonly VirtualDomNode[] => {
  const { value, type } = entry
  switch (type) {
    case TableCellType.Code:
      return getCellCodeVirtualDom(value)
    default:
      return getCellTextVirtualDom(value)
  }
}
