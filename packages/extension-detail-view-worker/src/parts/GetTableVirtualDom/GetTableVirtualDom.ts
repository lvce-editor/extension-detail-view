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
      type: VirtualDomElements.Table,
      className: ClassNames.Table,
      childCount: 3,
    },
    {
      type: VirtualDomElements.ColGroup,
      className: 'ColumnGroup',
      childCount: 2,
    },
    {
      type: VirtualDomElements.Col,
      className: 'Col Column1',
      childCount: 0,
    },
    {
      type: VirtualDomElements.Col,
      className: 'Col Column2',
      childCount: 0,
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
    ...rows.flatMap(GetTableRowVirtualDom.getTableRowVirtualDom),
  ]
}
