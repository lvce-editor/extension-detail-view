import type { Category } from '../Category/Category.ts'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetChangelogVirtualDom from '../GetChangelogVirtualDom/GetChangelogVirtualDom.ts'
import * as GetDetailsVirtualDom from '../GetDetailsVirtualDom/GetDetailsVirtualDom.ts'
import { getFeaturesVirtualDom } from '../GetFeaturesVirtualDom/GetFeaturesVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

export const getExtensionDetailContentVirtualDom = (
  sanitizedReadmeHtml: readonly VirtualDomNode[],
  selectedTab: string,
  displaySize: string,
  extensionId: string,
  extensionVersion: string,
  width: number,
  scrollToTopButtonEnabled: boolean,
  categories: readonly Category[],
  resources: readonly Resource[],
  breakpoint: number,
  extensionUri: string,
  changelogDom: readonly VirtualDomNode[],
  state: ExtensionDetailState,
): readonly VirtualDomNode[] => {
  switch (selectedTab) {
    case InputName.Details:
      return GetDetailsVirtualDom.getDetailsVirtualDom(
        sanitizedReadmeHtml,
        displaySize,
        extensionId,
        extensionVersion,
        width,
        extensionUri,
        scrollToTopButtonEnabled,
        categories,
        resources,
        breakpoint,
      )
    case InputName.Features:
      return getFeaturesVirtualDom(state.features, state.selectedFeature, state)
    case InputName.Changelog:
      return GetChangelogVirtualDom.getChangelogVirtualDom(changelogDom)
    default:
      return []
  }
}
