import type { FeatureActivationEventsState } from '../FeatureActivationEventsDetails/FeatureActivationEventsDetails.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetFeatureActivationEventsVirtualDom from '../GetFeatureActivationEventsVirtualDom/GetFeatureActivationEventsVirtualDom.ts'

export const getActivationEventsVirtualDom = (state: FeatureActivationEventsState): readonly VirtualDomNode[] => {
  return GetFeatureActivationEventsVirtualDom.getFeatureActivationEventsVirtualDom(state.activationEntries)
}
