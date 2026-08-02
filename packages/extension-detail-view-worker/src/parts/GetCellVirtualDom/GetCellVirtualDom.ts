import type { Cell } from '../Cell/Cell.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetCellRenderer from '../GetCellRenderer/GetCellRenderer.ts'
import * as GetCellTextVirtualDom from '../GetCellTextVirtualDom/GetCellTextVirtualDom.ts'
import * as TableCellType from '../TableCellType/TableCellType.ts'

const isEmptyCell = (entry: Cell): boolean => {
  if (entry.type === TableCellType.CheckMark) {
    return false
  }
  if (entry.type === TableCellType.CodeList) {
    return entry.listItems.length === 0
  }
  return !entry.value || (Array.isArray(entry.value) && entry.value.length === 0)
}

export const getCellVirtualDom = (entry: Cell): readonly VirtualDomNode[] => {
  const { type, value, ...props } = entry
  const fn = GetCellRenderer.getCellRenderer(type)
  if (isEmptyCell(entry)) {
    return GetCellTextVirtualDom.getCellTextVirtualDom('-', props)
  }
  return fn(value, props)
}
