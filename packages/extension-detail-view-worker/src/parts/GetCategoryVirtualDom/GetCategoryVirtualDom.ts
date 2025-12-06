import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Category } from '../Category/Category.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getCategoryVirtualDom = (category: Category): readonly VirtualDomNode[] => {
  const { id, label } = category
  return [
    {
      childCount: 1,
      className: ClassNames.Category,
      name: id,
      onClick: DomEventListenerFunctions.HandleClickCategory,
      type: VirtualDomElements.Button,
    },
    text(label),
  ]
}
