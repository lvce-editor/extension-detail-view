import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Category } from '../Category/Category.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetAdditionalDetailsVirtualDom from '../GetAdditionalDetailsVirtualDom/GetAdditionalDetailsVirtualDom.ts'
import * as GetInstallationEntries from '../GetInstallationEntries/GetInstallationEntries.ts'
import * as GetMarkdownVirtualDom from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetMarketplaceEntries from '../GetMarketplaceEntries/GetMarketplaceEntries.ts'
import * as GetScrollToTopVirtualDom from '../GetScrollToTopVirtualDom/GetScrollToTopVirtualDom.ts'

const getChildCount = (additionalDetails: boolean, scrollToTopEnabled: boolean): number => {
  let count = 1
  if (additionalDetails) {
    count++
  }
  if (scrollToTopEnabled) {
    count++
  }
  return count
}

export const getDetailsVirtualDom = async (
  sanitizedReadmeHtml: string,
  displaySize: string,
  extensionId: string,
  extensionVersion: string,
  width: number,
  extensionUri: string,
  scrollToTopButtonEnabled: boolean,
  categories: readonly Category[],
  resources: readonly Resource[],
): Promise<readonly VirtualDomNode[]> => {
  const firstHeading = ExtensionDetailStrings.installation()
  const entries: readonly MoreInfoEntry[] = GetInstallationEntries.getInstallationEntries(displaySize, extensionId, extensionVersion, extensionUri)
  const secondHeading = ExtensionDetailStrings.marketplace()
  const secondEntries: readonly MoreInfoEntry[] = GetMarketplaceEntries.getMarketplaceEntries()
  const thirdHeading = ExtensionDetailStrings.categories()
  const fourthHeading = ExtensionDetailStrings.resources()
  const showAdditionalDetailsBreakpoint = 600
  const showAdditionalDetails = width > showAdditionalDetailsBreakpoint
  const childCount = getChildCount(showAdditionalDetails, scrollToTopButtonEnabled)
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailPanel,
      childCount: childCount,
      role: AriaRoles.Panel,
    },
    ...GetScrollToTopVirtualDom.getScrollToTopVirtualDom(scrollToTopButtonEnabled),
    ...(await GetMarkdownVirtualDom.getMarkdownVirtualDom(sanitizedReadmeHtml)),
    ...GetAdditionalDetailsVirtualDom.getAdditionalDetailsVirtualDom(
      showAdditionalDetails,
      firstHeading,
      entries,
      secondHeading,
      secondEntries,
      thirdHeading,
      categories,
      fourthHeading,
      resources,
    ),
  ]
  return dom
}
