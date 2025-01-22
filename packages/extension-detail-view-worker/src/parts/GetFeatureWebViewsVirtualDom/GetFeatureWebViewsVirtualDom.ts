import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'
import * as GetWebViewVirtualDom from '../GetWebViewVirtualDom/GetWebViewVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getFeatureWebViewsVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  const webViews = extension.webViews || []
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
