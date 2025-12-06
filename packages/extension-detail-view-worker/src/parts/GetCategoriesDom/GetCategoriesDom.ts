import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Category } from '../Category/Category.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetCategoryVirtualDom from '../GetCategoryVirtualDom/GetCategoryVirtualDom.ts'

export const getCategoriesDom = (categories: readonly Category[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: categories.length,
      className: ClassNames.Categories,
      type: VirtualDomElements.Div,
    },
    ...categories.flatMap(GetCategoryVirtualDom.getCategoryVirtualDom),
  ]
}
