import type { FeatureWebViewsState } from '../FeatureWebViewsDetails/FeatureWebViewsDetails.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureWebViewsVirtualDom from '../GetFeatureWebViewsVirtualDom/GetFeatureWebViewsVirtualDom.ts'

export const getWebViewsVirtualDom = (state: FeatureWebViewsState): readonly VirtualDomNode[] => {
  return GetFeatureWebViewsVirtualDom.getFeatureWebViewsVirtualDom(state.webViews)
}
