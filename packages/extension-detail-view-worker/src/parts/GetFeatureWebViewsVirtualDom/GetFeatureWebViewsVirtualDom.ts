import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import * as GetWebViews from '../GetWebViews/GetWebViews.ts'
import * as GetWebViewVirtualDom from '../GetWebViewVirtualDom/GetWebViewVirtualDom.ts'

export const getFeatureWebViewsVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  const webViews = GetWebViews.getWebViews(extension)
  const heading = ExtensionDetailStrings.webViews()
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
    {
      type: VirtualDomElements.Div,
      childCount: webViews.length,
    },
    ...webViews.flatMap(GetWebViewVirtualDom.getWebViewVirtualDom),
  ]
}
