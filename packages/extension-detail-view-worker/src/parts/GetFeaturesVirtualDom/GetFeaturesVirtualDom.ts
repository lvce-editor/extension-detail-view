import type { Feature } from '../Feature/Feature.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetFeatureListVirtualDom from '../GetFeatureListVirtualDom/GetFeatureListVirtualDom.ts'
import * as GetFeatureThemesVirtualDom from '../GetFeatureThemesVirtualDom/GetFeatureThemesVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getFeaturesVirtualDom = (features: readonly Feature[], themesHtml: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Features,
      childCount: 3,
    },
    ...GetFeatureListVirtualDom.getFeatureListVirtualDom(features),
    {
      type: VirtualDomElements.Div,
      className: 'Sash SashVertical',
      childCount: 0,
    },
    ...GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(themesHtml),
  ]
}
