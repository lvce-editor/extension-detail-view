import type { Feature } from '../Feature/Feature.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureListItemVirtualDom from '../GetFeatureListItemVirtualDom/GetFeatureListItemVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getFeatureListVirtualDom = (features: readonly Feature[]): readonly VirtualDomNode[] => {
  return [
    {
      // TODO use either list or tabs role
      type: VirtualDomElements.Div,
      className: 'FeaturesList',
      childCount: features.length,
    },
    ...features.flatMap(GetFeatureListItemVirtualDom.getFeatureListItemVirtualDom),
  ]
}
