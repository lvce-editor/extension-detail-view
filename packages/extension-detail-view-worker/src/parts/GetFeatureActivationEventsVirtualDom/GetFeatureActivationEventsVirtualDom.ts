import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureContentHeadingVirtualDom from '../GetFeatureContentHeadingVirtualDom/GetFeatureContentHeadingVirtualDom.ts'

const getActivationEventVirtualDom = (event: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Li,
      childCount: 1,
    },
    text(event),
  ]
}

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
    ...activationEvents.flatMap(getActivationEventVirtualDom),
  ]
}
