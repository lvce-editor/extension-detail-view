import type { Category } from '../Category/Category.ts'
import type { Feature } from '../Feature/Feature.ts'
import type { Resource } from '../Resource/Resource.ts'
import type { Row } from '../Row/Row.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { WebView } from '../WebView/WebView.ts'
import * as GetChangelogVirtualDom from '../GetChangelogVirtualDom/GetChangelogVirtualDom.ts'
import * as GetDetailsVirtualDom from '../GetDetailsVirtualDom/GetDetailsVirtualDom.ts'
import * as GetFeaturesVirtualDom from '../GetFeaturesVirtualDom/GetFeaturesVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'

export const getExtensionDetailContentVirtualDom = (
  sanitizedReadmeHtml: readonly VirtualDomNode[],
  themesDom: readonly VirtualDomNode[],
  selectedTab: string,
  features: readonly Feature[],
  displaySize: string,
  extensionId: string,
  extensionVersion: string,
  selectedFeature: string,
  width: number,
  scrollToTopButtonEnabled: boolean,
  categories: readonly Category[],
  resources: readonly Resource[],
  breakpoint: number,
  commands: readonly Row[],
  jsonValidation: readonly Row[],
  settings: readonly Row[],
  webViews: readonly WebView[],
  extensionUri: string,
  changelogDom: readonly VirtualDomNode[],
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
      return GetFeaturesVirtualDom.getFeaturesVirtualDom(features, themesDom, selectedFeature, commands, jsonValidation, settings, webViews)
    case InputName.Changelog:
      return GetChangelogVirtualDom.getChangelogVirtualDom(changelogDom)
    default:
      return []
  }
}
