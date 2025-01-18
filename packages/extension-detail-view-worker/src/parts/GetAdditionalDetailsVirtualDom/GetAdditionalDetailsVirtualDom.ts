import type { Category } from '../Category/Category.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetCategoriesDom from '../GetCategoriesDom/GetCategoriesDom.ts'
import * as GetMoreInfoVirtualDom from '../GetMoreInfoVirtualDom/GetMoreInfoVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getAdditionalDetailsVirtualDom = (
  firstHeading: string,
  entries: readonly MoreInfoEntry[],
  secondHeading: string,
  secondEntries: readonly MoreInfoEntry[],
  thirdHeading: string,
  categories: readonly Category[],
): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: 'AdditionalDetails',
      childCount: 3,
    },
    {
      type: VirtualDomElements.Div,
      className: 'AdditionalDetailsEntry',
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: 'AdditionalDetailsTitle',
      childCount: 1,
    },
    text(firstHeading),
    ...GetMoreInfoVirtualDom.getMoreInfoVirtualDom(entries),
    {
      type: VirtualDomElements.Div,
      className: 'AdditionalDetailsEntry',
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: 'AdditionalDetailsTitle',
      childCount: 1,
    },
    text(secondHeading),
    ...GetMoreInfoVirtualDom.getMoreInfoVirtualDom(secondEntries),

    {
      type: VirtualDomElements.Div,
      className: 'AdditionalDetailsEntry',
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: 'AdditionalDetailsTitle',
      childCount: 1,
    },
    text(thirdHeading),
    ...GetCategoriesDom.getCategoriesDom(categories),
  ]
}
