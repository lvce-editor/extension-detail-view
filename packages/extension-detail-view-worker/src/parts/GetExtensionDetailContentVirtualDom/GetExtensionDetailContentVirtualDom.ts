import type { Feature } from '../Feature/Feature.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetChangelogVirtualDom from '../GetChangelogVirtualDom/GetChangelogVirtualDom.ts'
import * as GetDetailsVirtualDom from '../GetDetailsVirtualDom/GetDetailsVirtualDom.ts'
import * as GetFeaturesVirtualDom from '../GetFeaturesVirtualDom/GetFeaturesVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

export const getExtensionDetailContentVirtualDom = (
  sanitizedReadmeHtml: string,
  themesHtml: string,
  selectedTab: string,
  features: readonly Feature[],
  displaySize: string,
  extensionId: string,
  extensionVersion: string,
): readonly VirtualDomNode[] => {
  switch (selectedTab) {
    case InputName.Details:
      return GetDetailsVirtualDom.getDetailsVirtualDom(sanitizedReadmeHtml, displaySize, extensionId, extensionVersion)
    case InputName.Features:
      return GetFeaturesVirtualDom.getFeaturesVirtualDom(features, themesHtml)
    case InputName.Changelog:
      return GetChangelogVirtualDom.getChangelogVirtualDom()
    default:
      return []
  }
}
