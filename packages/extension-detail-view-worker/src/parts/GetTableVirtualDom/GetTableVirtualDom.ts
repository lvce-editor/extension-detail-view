import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetTableHeadingVirtualDom from '../GetTableHeadingVirtualDom/GetTableHeadingVirtualDom.ts'
import * as GetTableRowVirtualDom from '../GetTableRowVirtualDom/GetTableRowVirtualDom.ts'

export const getTableVirtualDom = (tableInfo: TableInfo): readonly VirtualDomNode[] => {
  const { headings, rows } = tableInfo
  return [
    {
      childCount: 2,
      className: ClassNames.Table,
      type: VirtualDomElements.Table,
    },
    {
      childCount: 1,
      type: VirtualDomElements.THead,
    },
    {
      childCount: headings.length,
      type: VirtualDomElements.Tr,
    },
    ...headings.flatMap(GetTableHeadingVirtualDom.getTableHeadingVirtualDom),
    {
      childCount: rows.length,
      type: VirtualDomElements.TBody,
    },
    ...rows.flatMap(GetTableRowVirtualDom.getTableRowVirtualDom),
  ]
}
