import type { Cell } from '../Cell/Cell.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetCellCodeVirtualDom from '../GetCellCodeVirtualDom/GetCellCodeVirtualDom.ts'
import * as GetCellTextVirtualDom from '../GetCellTextVirtualDom/GetCellTextVirtualDom.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getCellVirtualDom = (entry: Cell): readonly VirtualDomNode[] => {
  const { value, type } = entry
  switch (type) {
    case TableCellType.Code:
      return GetCellCodeVirtualDom.getCellCodeVirtualDom(value)
    default:
      return GetCellTextVirtualDom.getCellTextVirtualDom(value)
  }
}
