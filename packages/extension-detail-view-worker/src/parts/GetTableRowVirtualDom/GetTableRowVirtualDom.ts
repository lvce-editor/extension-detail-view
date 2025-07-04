import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Row } from '../Row/Row.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetCellVirtualDom from '../GetCellVirtualDom/GetCellVirtualDom.ts'

export const getTableRowVirtualDom = (entries: Row): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Tr,
      childCount: entries.length,
    },
    ...entries.flatMap(GetCellVirtualDom.getCellVirtualDom),
  ]
}
