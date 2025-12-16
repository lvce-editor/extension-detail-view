import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Category } from '../Category/Category.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
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
  const sections: readonly VirtualDomNode[] = [
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom(firstHeading, entries, GetMoreInfoVirtualDom.getMoreInfoVirtualDom),
    ...(secondEntries.length > 0
      ? GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom(
          secondHeading,
          secondEntries,
          GetMoreInfoVirtualDom.getMoreInfoVirtualDom,
        )
      : []),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom(thirdHeading, categories, GetCategoriesDom.getCategoriesDom),
    ...GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom(
      fourthHeading,
      resources,
      GetResourcesVirtualDom.getResourcesVirtualDom,
    ),
  ]
  const childCount = secondEntries.length > 0 ? 4 : 3
  return [
    {
      childCount: 1,
      className: ClassNames.Aside,
      type: VirtualDomElements.Aside,
    },
    {
      childCount: childCount,
      className: ClassNames.AdditionalDetails,
      onContextMenu: DomEventListenerFunctions.HandleAdditionalDetailContextMenu,
      tabIndex: 0,
      type: VirtualDomElements.Div,
    },
    ...sections,
  ]
}
