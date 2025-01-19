import type { Cell } from '../Cell/Cell.ts'
import type { Row } from '../Row/Row.ts'
import type { TableInfo } from '../TableInfo/TableInfo.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getTableHeadingVirtualDom = (heading: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Th,
      childCount: 1,
    },
    text(heading),
  ]
}

const getCellVirtualDom = (entry: Cell): readonly VirtualDomNode[] => {
  const { value } = entry
  return [
    {
      type: VirtualDomElements.Td,
      childCount: 1,
    },
    text(value),
  ]
}

const getTableRowVirtualDom = (entries: Row): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Tr,
      childCount: entries.length,
    },
    ...entries.flatMap(getCellVirtualDom),
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
    ...headings.flatMap(getTableHeadingVirtualDom),
    {
      type: VirtualDomElements.TBody,
      childCount: rows.length,
    },
    ...rows.flatMap(getTableRowVirtualDom),
  ]
}
