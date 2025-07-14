import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Category } from '../Category/Category.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetAdditionalDetailsVirtualDom from '../GetAdditionalDetailsVirtualDom/GetAdditionalDetailsVirtualDom.ts'
import * as GetInstallationEntries from '../GetInstallationEntries/GetInstallationEntries.ts'
import * as GetMarketplaceEntries from '../GetMarketplaceEntries/GetMarketplaceEntries.ts'

const getChildCount = (additionalDetails: boolean, scrollToTopEnabled: boolean): number => {
  let count = 1
  if (additionalDetails) {
    count++
  }
  return count
}

export const getDetailsVirtualDom = (
  sanitizedReadmeHtml: readonly VirtualDomNode[],
  displaySize: string,
  extensionId: string,
  extensionVersion: string,
  width: number,
  extensionUri: string,
  scrollToTopButtonEnabled: boolean,
  categories: readonly Category[],
  resources: readonly Resource[],
  showAdditionalDetailsBreakpoint: number, // new parameter, no default
): readonly VirtualDomNode[] => {
  const firstHeading = ExtensionDetailStrings.installation()
  const entries: readonly MoreInfoEntry[] = GetInstallationEntries.getInstallationEntries(displaySize, extensionId, extensionVersion, extensionUri)
  const secondHeading = ExtensionDetailStrings.marketplace()
  const secondEntries: readonly MoreInfoEntry[] = GetMarketplaceEntries.getMarketplaceEntries()
  const thirdHeading = ExtensionDetailStrings.categories()
  const fourthHeading = ExtensionDetailStrings.resources()
  const showAdditionalDetails = width > showAdditionalDetailsBreakpoint
  const childCount = getChildCount(showAdditionalDetails, scrollToTopButtonEnabled)
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailPanel,
      childCount: childCount,
      role: AriaRoles.Panel,
      onScroll: DomEventListenerFunctions.HandleReadmeScroll,
    },
    ...sanitizedReadmeHtml,
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
