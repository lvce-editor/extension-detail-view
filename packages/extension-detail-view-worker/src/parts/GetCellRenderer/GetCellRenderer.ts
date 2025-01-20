import type { CellRenderer } from '../CellRenderer/CellRenderer.ts'
import * as GetCellCodeVirtualDom from '../GetCellCodeVirtualDom/GetCellCodeVirtualDom.ts'
import * as GetCellTextVirtualDom from '../GetCellTextVirtualDom/GetCellTextVirtualDom.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getCellRenderer = (type: number): CellRenderer => {
  switch (type) {
    case TableCellType.Code:
      return GetCellCodeVirtualDom.getCellCodeVirtualDom
    case TableCellType.Text:
      return GetCellTextVirtualDom.getCellTextVirtualDom
    default:
      throw new Error(`unexpected cell type ${type}`)
  }
}
