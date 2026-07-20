import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { WebView } from '../WebView/WebView.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import * as GetWebViewVirtualDom from '../GetWebViewVirtualDom/GetWebViewVirtualDom.ts'

const featureContentNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.FeatureContent,
  type: VirtualDomElements.Div,
}

export const getFeatureWebViewsVirtualDom = (webViews: readonly WebView[]): readonly VirtualDomNode[] => {
  const heading = ExtensionDetailStrings.webViews()
  return [
    featureContentNode,
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
    {
      childCount: webViews.length,
      type: VirtualDomElements.Div,
    },
    ...webViews.flatMap(GetWebViewVirtualDom.getWebViewVirtualDom),
  ]
}
