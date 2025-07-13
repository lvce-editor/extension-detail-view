import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureWebViewsVirtualDom from '../GetFeatureWebViewsVirtualDom/GetFeatureWebViewsVirtualDom.ts'

export const getWebViewsVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  return GetFeatureWebViewsVirtualDom.getFeatureWebViewsVirtualDom(state.webViews)
}