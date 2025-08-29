import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Category } from '../Category/Category.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetAdditionalDetailsEntryVirtualDom from '../GetAdditionalDetailsEntryVirtualDom/GetAdditionalDetailsEntryVirtualDom.ts'
import * as GetCategoriesDom from '../GetCategoriesDom/GetCategoriesDom.ts'
import * as GetMoreInfoVirtualDom from '../GetMoreInfoVirtualDom/GetMoreInfoVirtualDom.ts'
import * as GetResourcesVirtualDom from '../GetResourcesVirtualDom/GetResourcesVirtualDom.ts'

export const getAdditionalDetailsVirtualDom = (
  showAdditionalDetails: boolean,
  firstHeading: string,
  entries: readonly MoreInfoEntry[],
  secondHeading: string,
  secondEntries: readonly MoreInfoEntry[],
  thirdHeading: string,
  categories: readonly Category[],
  fourthHeading: string,
  resources: readonly Resource[],
): readonly VirtualDomNode[] => {
  if (!showAdditionalDetails) {
    return []
  }
  return [
    {
      type: VirtualDomElements.Aside,
      className: ClassNames.Aside,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.AdditionalDetails,
      tabIndex: 0,
      childCount: 4,
    },
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom(firstHeading, entries, GetMoreInfoVirtualDom.getMoreInfoVirtualDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom(
      secondHeading,
      secondEntries,
      GetMoreInfoVirtualDom.getMoreInfoVirtualDom,
    ),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom(thirdHeading, categories, GetCategoriesDom.getCategoriesDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom(
      fourthHeading,
      resources,
      GetResourcesVirtualDom.getResourcesVirtualDom,
    ),
  ]
}
