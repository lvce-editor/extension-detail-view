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
      type: VirtualDomElements.Button,
      className: ClassNames.Category,
      childCount: 1,
      onClick: DomEventListenerFunctions.HandleClickCategory,
      name: id,
    },
    text(label),
  ]
}
