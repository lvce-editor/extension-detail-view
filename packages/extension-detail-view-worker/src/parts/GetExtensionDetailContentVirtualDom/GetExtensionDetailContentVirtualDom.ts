import type { Category } from '../Category/Category.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetChangelogVirtualDom from '../GetChangelogVirtualDom/GetChangelogVirtualDom.ts'
import * as GetDetailsVirtualDom from '../GetDetailsVirtualDom/GetDetailsVirtualDom.ts'
import * as GetFeaturesVirtualDom from '../GetFeaturesVirtualDom/GetFeaturesVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

export const getExtensionDetailContentVirtualDom = (
  sanitizedReadmeHtml: readonly VirtualDomNode[],
  selectedTab: string,
  width: number,
  scrollToTopButtonEnabled: boolean,
  categories: readonly Category[],
  resources: readonly Resource[],
  breakpoint: number,
  changelogDom: readonly VirtualDomNode[],
  state: ExtensionDetailState,
): readonly VirtualDomNode[] => {
  switch (selectedTab) {
    case InputName.Details:
      return GetDetailsVirtualDom.getDetailsVirtualDom(
        sanitizedReadmeHtml,
        width,
        scrollToTopButtonEnabled,
        categories,
        resources,
        breakpoint,
        state.installationEntries,
        state.marketplaceEntries,
        state.hasReadme,
        state.sideBarWidth > 0,
      )
    case InputName.Features:
      return GetFeaturesVirtualDom.getFeaturesVirtualDom(state.features, state.selectedFeature, state)
    case InputName.Changelog:
      return GetChangelogVirtualDom.getChangelogVirtualDom(changelogDom)
    default:
      return []
  }
}
