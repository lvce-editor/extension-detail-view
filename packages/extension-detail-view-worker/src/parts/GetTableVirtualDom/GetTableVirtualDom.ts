import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetCellVirtualDom from '../GetCellVirtualDom/GetCellVirtualDom.ts'
import * as GetTableHeadingVirtualDom from '../GetTableHeadingVirtualDom/GetTableHeadingVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

const getTableRowVirtualDom = (entries: Row): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Tr,
      childCount: entries.length,
    },
    ...entries.flatMap(GetCellVirtualDom.getCellVirtualDom),
  ]
}

export const getTableVirtualDom = (tableInfo: TableInfo): readonly VirtualDomNode[] => {
  const { headings, rows } = tableInfo
  return [
    {
      type: VirtualDomElements.Table,
      className: 'Table',
      childCount: 2,
    },
    {
      type: VirtualDomElements.THead,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Tr,
      childCount: headings.length,
    },
    ...headings.flatMap(GetTableHeadingVirtualDom.getTableHeadingVirtualDom),
    {
      type: VirtualDomElements.TBody,
      childCount: rows.length,
    },
    ...rows.flatMap(getTableRowVirtualDom),
  ]
}
