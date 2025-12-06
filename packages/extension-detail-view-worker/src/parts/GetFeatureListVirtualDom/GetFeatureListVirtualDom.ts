import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Feature } from '../Feature/Feature.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetFeatureListItemVirtualDom from '../GetFeatureListItemVirtualDom/GetFeatureListItemVirtualDom.ts'

export const getFeatureListVirtualDom = (features: readonly Feature[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: features.length,
      className: ClassNames.FeaturesList,
      onClick: DomEventListenerFunctions.HandleFeaturesClick,
      // TODO use either list or tabs role
      type: VirtualDomElements.Div,
    },
    ...features.flatMap(GetFeatureListItemVirtualDom.getFeatureListItemVirtualDom),
  ]
}
