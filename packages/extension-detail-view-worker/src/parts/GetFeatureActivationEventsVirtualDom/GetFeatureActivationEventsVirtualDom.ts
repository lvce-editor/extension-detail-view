import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ActivationEntry } from '../ActivationEntry/ActivationEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetActivationEventVirtualDom from '../GetActivationEventVirtualDom/GetActivationEventVirtualDom.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'

export const getFeatureActivationEventsVirtualDom = (activationEvents: readonly ActivationEntry[]): readonly VirtualDomNode[] => {
  const heading = ExtensionDetailStrings.activationEvents()
  return [
    {
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    ...GetFeatureContentHeadingVirtualDom.getFeatureContentHeadingVirtualDom(heading),
    {
      childCount: activationEvents.length,
      type: VirtualDomElements.Ul,
    },
    ...activationEvents.flatMap(GetActivationEventVirtualDom.getActivationEventVirtualDom),
  ]
}
