import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetWebViewVirtualDom from '../GetWebViewVirtualDom/GetWebViewVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeatureWebViewsVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  const webViews = extension.webViews || []
  const heading = ExtensionDetailStrings.webViews()
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureCommands,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(heading),
    {
      type: VirtualDomElements.Div,
      childCount: webViews.length,
    },
    ...webViews.flatMap(GetWebViewVirtualDom.getWebViewVirtualDom),
  ]
}
