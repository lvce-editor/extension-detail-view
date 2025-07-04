import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Category } from '../Category/Category.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetCategoryVirtualDom from '../GetCategoryVirtualDom/GetCategoryVirtualDom.ts'

export const getCategoriesDom = (categories: readonly Category[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Categories,
      childCount: categories.length,
    },
    ...categories.flatMap(GetCategoryVirtualDom.getCategoryVirtualDom),
  ]
}
