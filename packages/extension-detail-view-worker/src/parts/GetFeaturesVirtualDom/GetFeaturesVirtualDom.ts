import type { Feature } from '../Feature/Feature.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetFeatureListVirtualDom from '../GetFeatureListVirtualDom/GetFeatureListVirtualDom.ts'
import * as GetFeatureThemesVirtualDom from '../GetFeatureThemesVirtualDom/GetFeatureThemesVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getFeaturesVirtualDom = (themesHtml: string): readonly VirtualDomNode[] => {
  const features: readonly Feature[] = [
    {
      id: 'theme',
      label: 'Theme',
    },
  ]
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Features,
      childCount: 2,
    },
    ...GetFeatureListVirtualDom.getFeatureListVirtualDom(features),
    ...GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(themesHtml),
  ]
}
