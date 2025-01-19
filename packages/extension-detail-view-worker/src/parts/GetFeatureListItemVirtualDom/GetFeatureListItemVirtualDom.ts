import type { Feature } from '../Feature/Feature.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeatureListItemVirtualDom = (feature: Feature): readonly VirtualDomNode[] => {
  const { label, selected, id } = feature
  const className = selected ? 'Feature FeatureSelected' : ClassNames.Feature
  return [
    {
      // TODO use role list item or tab
      type: VirtualDomElements.Button,
      name: id,
      className,
      childCount: 1,
    },
    text(label),
  ]
}
