import type { Feature } from '../Feature/Feature.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetFeatureListVirtualDom from '../GetFeatureListVirtualDom/GetFeatureListVirtualDom.ts'
import * as GetFeatures from '../GetFeatures/GetFeatures.ts'
import * as GetFeatureThemesVirtualDom from '../GetFeatureThemesVirtualDom/GetFeatureThemesVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getFeaturesVirtualDom = (themesHtml: string): readonly VirtualDomNode[] => {
  const features: readonly Feature[] = GetFeatures.getFeatures()
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
