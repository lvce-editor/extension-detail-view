import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetActivationEventVirtualDom from '../GetActivationEventVirtualDom/GetActivationEventVirtualDom.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'

export const getFeatureActivationEventsVirtualDom = (activationEvents: readonly string[]): readonly VirtualDomNode[] => {
  const heading = ExtensionDetailStrings.activationEvents()
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
    {
      type: VirtualDomElements.Ul,
      childCount: activationEvents.length,
    },
    ...activationEvents.flatMap(GetActivationEventVirtualDom.getActivationEventVirtualDom),
  ]
}
