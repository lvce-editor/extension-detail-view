import type { Category } from '../Category/Category.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetAdditionalDetailsVirtualDom from '../GetAdditionalDetailsVirtualDom/GetAdditionalDetailsVirtualDom.ts'
import * as GetInstallationEntries from '../GetInstallationEntries/GetInstallationEntries.ts'
import * as GetMarkdownVirtualDom from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetMarketplaceEntries from '../GetMarketplaceEntries/GetMarketplaceEntries.ts'
import * as GetVirtualDomChildCount from '../GetVirtualDomChildCount/GetVirtualDomChildCount.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getDetailsVirtualDom = (
  sanitizedReadmeHtml: string,
  displaySize: string,
  extensionId: string,
  extensionVersion: string,
  width: number,
): readonly VirtualDomNode[] => {
  const markdownDom = GetMarkdownVirtualDom.getMarkdownVirtualDom(sanitizedReadmeHtml)
  const markdownChildCount = GetVirtualDomChildCount.getVirtualDomChildCount(markdownDom)

  const firstHeading = 'Installation'
  const entries: readonly MoreInfoEntry[] = GetInstallationEntries.getInstallationEntries(displaySize, extensionId, extensionVersion)
  const secondHeading = 'Marketplace'
  const secondEntries: readonly MoreInfoEntry[] = GetMarketplaceEntries.getMarketplaceEntries()
  const thirdHeading = 'Categories'
  const categories: readonly Category[] = [
    {
      id: 'themes',
      label: 'Themes',
    },
  ]
  const fourthHeading = 'Resources'
  const resources: readonly Resource[] = [
    {
      label: 'Marketplace',
      url: '#',
    },
    {
      label: 'Issues',
      url: '#',
    },
    {
      label: 'Repository',
      url: '#',
    },
    {
      label: 'License',
      url: '#',
    },
  ]
  const showAdditionalDetailsBreakpoint = 600
  const showAdditionalDetails = width > showAdditionalDetailsBreakpoint
  const childCount = showAdditionalDetails ? 2 : 1
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailPanel,
      childCount: childCount,
      role: AriaRoles.Panel,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Markdown,
      role: AriaRoles.Document,
      onContextMenu: DomEventListenerFunctions.HandleReadmeContextMenu,
      childCount: markdownChildCount,
    },
    ...markdownDom,
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
