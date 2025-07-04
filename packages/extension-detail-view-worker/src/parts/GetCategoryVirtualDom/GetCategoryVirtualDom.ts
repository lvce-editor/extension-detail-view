import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Category } from '../Category/Category.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getCategoryVirtualDom = (category: Category): readonly VirtualDomNode[] => {
  const { label } = category
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Category,
      childCount: 1,
    },
    text(label),
  ]
}
