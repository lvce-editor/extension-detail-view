import type { Cell } from '../Cell/Cell.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetCellRenderer from '../GetCellRenderer/GetCellRenderer.ts'

export const getCellVirtualDom = (entry: Cell): readonly VirtualDomNode[] => {
  const { type, value, ...props } = entry
  const fn = GetCellRenderer.getCellRenderer(type)
  return fn(value, props)
}
