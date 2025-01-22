import type { Feature } from '../Feature/Feature.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetFeatureContentVirtualDom from '../GetFeatureContentVirtualDom/GetFeatureContentVirtualDom.ts'
import * as GetFeatureListVirtualDom from '../GetFeatureListVirtualDom/GetFeatureListVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeaturesVirtualDom = (
  features: readonly Feature[],
  themesHtml: string,
  selectedFeature: string,
  extension: any,
): readonly VirtualDomNode[] => {
  if (features.length === 0) {
    return [
      {
        type: VirtualDomElements.Div,
        className: ClassNames.Features,
        childCount: 3,
      },
      text('None'),
    ]
  }
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
    ...GetFeatureContentVirtualDom.getFeatureContentVirtualDom(features, themesHtml, selectedFeature, extension),
  ]
}
