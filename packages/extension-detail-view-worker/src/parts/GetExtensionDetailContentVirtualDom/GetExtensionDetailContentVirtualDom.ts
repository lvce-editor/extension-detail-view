import type { Category } from '../Category/Category.ts'
import type { Feature } from '../Feature/Feature.ts'
import type { Resource } from '../Resource/Resource.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetChangelogVirtualDom from '../GetChangelogVirtualDom/GetChangelogVirtualDom.ts'
import * as GetDetailsVirtualDom from '../GetDetailsVirtualDom/GetDetailsVirtualDom.ts'
import * as GetFeaturesVirtualDom from '../GetFeaturesVirtualDom/GetFeaturesVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

export const getExtensionDetailContentVirtualDom = async (
  sanitizedReadmeHtml: string,
  themesHtml: string,
  selectedTab: string,
  features: readonly Feature[],
  displaySize: string,
  extensionId: string,
  extensionVersion: string,
  selectedFeature: string,
  extension: any,
  width: number,
  scrollToTopButtonEnabled: boolean,
  categories: readonly Category[],
  resources: readonly Resource[],
): Promise<readonly VirtualDomNode[]> => {
  switch (selectedTab) {
    case InputName.Details:
      return await GetDetailsVirtualDom.getDetailsVirtualDom(sanitizedReadmeHtml, displaySize, extensionId, extensionVersion, width, extension.uri || extension.path || '', scrollToTopButtonEnabled, categories, resources)
    case InputName.Features:
      return await GetFeaturesVirtualDom.getFeaturesVirtualDom(features, themesHtml, selectedFeature, extension)
    case InputName.Changelog:
      return GetChangelogVirtualDom.getChangelogVirtualDom()
    default:
      return []
  }
}
