import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getListItemDom = (item: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      type: VirtualDomElements.Code,
    },
    text(item),
  ]
}

export const getCellCodeListVirtualDom = (value: string, props: { readonly listItems: readonly string[] }): readonly VirtualDomNode[] => {
  const { listItems } = props
  return [
    {
      childCount: listItems.length,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    ...listItems.flatMap(getListItemDom),
  ]
}
