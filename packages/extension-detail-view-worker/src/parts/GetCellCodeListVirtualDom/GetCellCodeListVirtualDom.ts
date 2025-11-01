import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getListItemDom = (item: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Code,
      childCount: 1,
    },
    text(item),
  ]
}

export const getCellCodeListVirtualDom = (value: string, props: { readonly listItems: readonly string[] }): readonly VirtualDomNode[] => {
  const { listItems } = props
  return [
    {
      type: VirtualDomElements.Td,
      className: ClassNames.TableCell,
      childCount: listItems.length,
    },
    ...listItems.flatMap(getListItemDom),
  ]
}
