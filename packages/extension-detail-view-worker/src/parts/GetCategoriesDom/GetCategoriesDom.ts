import type { Category } from '../Category/Category.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetCategoryVirtualDom from '../GetCategoryVirtualDom/GetCategoryVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getCategoriesDom = (categories: readonly Category[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: 'Categories',
      childCount: categories.length,
    },
    ...categories.flatMap(GetCategoryVirtualDom.getCategoryVirtualDom),
  ]
}
