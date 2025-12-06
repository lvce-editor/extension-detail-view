import type { CellRenderer } from '../CellRenderer/CellRenderer.ts'
import { getCellCheckMarkVirtualDom } from '../GetCellCheckMarkVirtualDom/GetCellCheckMarkVirtualDom.ts'
import { getCellCodeListVirtualDom } from '../GetCellCodeListVirtualDom/GetCellCodeListVirtualDom.ts'
import * as GetCellCodeVirtualDom from '../GetCellCodeVirtualDom/GetCellCodeVirtualDom.ts'
import { getCellLinkVirtualDom } from '../GetCellLinkVirtualDom/GetCellLinkVirtualDom.ts'
import * as GetCellTextVirtualDom from '../GetCellTextVirtualDom/GetCellTextVirtualDom.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

export const getCellRenderer = (type: number): CellRenderer => {
  switch (type) {
    case TableCellType.CheckMark:
      return getCellCheckMarkVirtualDom
    case TableCellType.Code:
      return GetCellCodeVirtualDom.getCellCodeVirtualDom
    case TableCellType.CodeList:
      return getCellCodeListVirtualDom
    case TableCellType.Link:
      return getCellLinkVirtualDom
    case TableCellType.Text:
      return GetCellTextVirtualDom.getCellTextVirtualDom
    default:
      throw new Error(`unexpected cell type ${type}`)
  }
}
