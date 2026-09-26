import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Feature } from '../Feature/Feature.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getFeatureListItemVirtualDom = (feature: Feature): readonly VirtualDomNode[] => {
  const { id, label, selected } = feature
  const className = selected ? 'Feature FeatureSelected' : ClassNames.Feature
  return [
    {
      ariaSelected: selected,
      childCount: 1,
      className,
      name: id,
      role: AriaRoles.Tab,
      type: VirtualDomElements.Button,
    },
    text(label),
  ]
}
