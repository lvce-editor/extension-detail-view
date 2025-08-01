import { AriaRoles, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Category } from '../Category/Category.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetAdditionalDetailsVirtualDom from '../GetAdditionalDetailsVirtualDom/GetAdditionalDetailsVirtualDom.ts'

const getChildCount = (additionalDetails: boolean, scrollToTopEnabled: boolean): number => {
  let count = 1
  if (additionalDetails) {
    count++
  }
  return count
}

export const getDetailsVirtualDom = (
  sanitizedReadmeHtml: readonly VirtualDomNode[],
  width: number,
  scrollToTopButtonEnabled: boolean,
  categories: readonly Category[],
  resources: readonly Resource[],
  showAdditionalDetailsBreakpoint: number,
  installationEntries: readonly MoreInfoEntry[],
  marketplaceEntries: readonly MoreInfoEntry[],
  hasReadme: boolean,
): readonly VirtualDomNode[] => {
  const firstHeading = ExtensionDetailStrings.installation()
  const secondHeading = ExtensionDetailStrings.marketplace()
  const thirdHeading = ExtensionDetailStrings.categories()
  const fourthHeading = ExtensionDetailStrings.resources()
  const showAdditionalDetails = width > showAdditionalDetailsBreakpoint
  const childCount = getChildCount(showAdditionalDetails, scrollToTopButtonEnabled)
  const contentDom = hasReadme
    ? sanitizedReadmeHtml
    : [
        {
          type: VirtualDomElements.Div,
          childCount: 1,
          className: 'Markdown',
        },
        text(ExtensionDetailStrings.noReadmeFound()),
      ]
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailPanel,
      childCount: childCount,
      role: AriaRoles.Panel,
    },
    ...contentDom,
    ...GetAdditionalDetailsVirtualDom.getAdditionalDetailsVirtualDom(
      showAdditionalDetails,
      firstHeading,
      installationEntries,
      secondHeading,
      marketplaceEntries,
      thirdHeading,
      categories,
      fourthHeading,
      resources,
    ),
  ]
  return dom
}
